<template>
  <div>
    <h1>{{ user.name }}</h1>
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

<script>
export default {
  name: 'UserTodo',
  data() {
    return {
      todo: [],
      user: {},
    };
  },
  async mounted() {
    const { id } = this.$route.params;
    await this.loadUser(id);
    if (this.user) {
      await this.loadTodo();
    }
  },
  methods: {
    async loadUser(id) {
      await this.$axios.get(`https://jsonplaceholder.typicode.com/users?id=${id}`)
        .then((response) => {
          [this.user] = response.data;
        });
    },
    async loadTodo() {
      await this.$axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${this.user.id}`)
        .then((response) => {
          this.todo = response.data;
        });
    },
    back() {
      const userOnPage = this.$store.state.users[this.user.id];
      if (userOnPage) {
        this.$router.push({
          path: '/',
          query: {
            page: userOnPage.page,
          },
        });
        return;
      }
      this.$router.back();
    },
  },
};
</script>

<style scoped lang="scss">
ul, li{
  display: block;
  list-style: none;
}

</style>
