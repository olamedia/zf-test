<template>
  <div>
    <UserTable
      :users="users"
      @selected="selectUser"
    />
    <Pagination class="pagination" :total="totalPages" :current="page" @selected="selectPage"/>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import UserTable from '@/components/UserTable.vue';
import Pagination from '@/components/Pagination.vue';
import MutationTypes from '@/store/mutation-types';
import User from '@/models/User';
import UserResponse from '@/responses/UserResponse';
import { AxiosResponse } from 'axios';

@Component({
  components: {
    Pagination,
    UserTable,
  },
})
export default class Users extends Vue {
      users: User[] = []

      page = 1

      totalItems = 0

      totalPages = 1

      limit = 2

      // noinspection JSUnusedGlobalSymbols
      async mounted() {
        const page = parseInt(this.$route.query.page as string, 10);
        if (page > 0) {
          this.page = page;
        }
        await this.loadCurrentPage();
      }

      async loadCurrentPage() {
        await this.$axios.get(`https://jsonplaceholder.typicode.com/users?_page=${this.page}&_limit=${this.limit}`)
          .then((response: AxiosResponse & UserResponse) => {
            this.users = response.data;
            this.totalItems = parseInt(response.headers['x-total-count'], 10);
            this.updatePagination();
          });
      }

      selectUser(userId: number) {
        this.$store.commit(MutationTypes.SET_USERS_PAGE, {
          page: this.page,
          users: [this.users.find((user) => user.id === userId)],
        });
        this.$router.push({
          path: `/user/${userId}`,
        });
      }

      async selectPage(page: number) {
        await this.$router.push({
          query: {
            page: String(page),
          },
        });
        this.page = page;
        await this.loadCurrentPage();
      }

      updatePagination() {
        this.totalPages = Math.ceil(this.totalItems / this.limit);
      }
}
</script>

<style scoped lang="scss">
.pagination{
  margin-top: 1em;
}
</style>
