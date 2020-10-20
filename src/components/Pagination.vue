<template>
  <nav>
    <span
      v-for="page in pages"
      :key="page.page"
    >
      <span class="page_active" v-if="current === page.page">{{ page.name }}</span>
      <button
        v-if="current !== page.page"
        @click="$emit('selected', page.page)"
      >
        {{ page.name }}
      </button>
    </span>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

type Page = {
  page: number;
  name: number | string;
}

const PaginationProps = Vue.extend({
  props: {
    current: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
  },
});

@Component({
  components: {},
})
export default class Pagination extends PaginationProps {
  get pages(): Page[] {
    const pages: Page[] = [];
    if (this.current > 1) {
      pages.push({
        page: 1,
        name: 1,
      });
    }
    if (this.current - 1 > 1) {
      pages.push({
        page: this.current - 1,
        name: `Предыдущая (${this.current - 1})`,
      });
    }
    pages.push({
      page: this.current,
      name: this.current,
    });
    if (this.current + 1 < this.total) {
      pages.push({
        page: this.current + 1,
        name: `Следующая (${this.current + 1})`,
      });
    }
    if (this.current < this.total) {
      pages.push({
        page: this.total,
        name: this.total,
      });
    }
    return pages;
  }
}
</script>

<style scoped lang="scss">
button, .page_active{
  font: inherit;
  margin: 4px;
  padding: 5px 7px;
  border-radius: 2px;
  background: #fff;
}
.page_active{
  border: none;
  & :focus{
    outline: none;
  }
}
</style>
