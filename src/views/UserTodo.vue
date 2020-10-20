<template>
  <div>
    <h1 v-if="user">{{ user.name }}</h1>
    <button @click="back">Вернуться</button>
    <ul>
      <li v-for="item in todo" :key="item.id">
        <input type="checkbox" disabled :checked="item.completed" :id="'todo-item-' + item.id">
        <label :for="'todo-item-' + item.id"></label>
        <label :for="'todo-item-' + item.id"> {{ item.title }}</label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Todo from '@/models/Todo';
import UserResponse from '@/responses/UserResponse';
import User from '@/models/User';
import UserTodoResponse from '@/responses/UserTodoResponse';
import { RootState } from '@/store/types/RootState';
import { Store } from 'vuex';
import UserOnPage from '@/models/utility/UserOnPage';

@Component({
})
export default class UserTodo extends Vue {
  todo: Todo[] = []

  user: User | null = null

  // noinspection JSUnusedGlobalSymbols
  async mounted() {
    const id = parseInt(this.$route.params.id, 10);
    await this.loadUser(id);
    if (this.user) {
      await this.loadTodo();
    }
  }

  async loadUser(id: number): Promise<void> {
    await this.$axios.get(`https://jsonplaceholder.typicode.com/users?id=${id}`)
      .then((response: UserResponse) => {
        [this.user] = response.data;
      });
  }

  async loadTodo() {
    if (this.user === null) {
      return;
    }
    await this.$axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${this.user.id}`)
      .then((response: UserTodoResponse) => {
        this.todo = response.data;
      });
  }

  back() {
    if (this.user) {
      const userOnPage: UserOnPage = (this.$store as Store<RootState>).state.users[this.user.id];
      if (userOnPage) {
        this.$router.push({
          path: '/',
          query: {
            page: String(userOnPage.page),
          },
        });
        return;
      }
    }
    this.$router.back();
  }
}
</script>

<style scoped lang="scss">
ul, li{
  display: block;
  list-style: none;
}

</style>
