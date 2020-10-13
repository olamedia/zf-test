<template>
  <div>
    <UserTable
      :users="users"
      @selected="selectUser"
    />
    <Pagination class="pagination" :total="totalPages" :current="page" @selected="selectPage"/>
  </div>
</template>

<script>
import UserTable from '@/components/UserTable.vue';
import Pagination from '@/components/Pagination.vue';
import { MUTATIONS } from '@/store';

export default {
  name: 'Users',
  components: {
    Pagination,
    UserTable,
  },
  data() {
    return {
      users: [],
      page: 1,
      totalItems: 0,
      totalPages: 1,
      limit: 2,
    };
  },
  async mounted() {
    const { page } = this.$route.query;
    if (page > 0) {
      this.page = parseInt(page, 10);
    }
    await this.loadCurrentPage();
  },
  methods: {
    async loadCurrentPage() {
      await this.$axios.get(`https://jsonplaceholder.typicode.com/users?_page=${this.page}&_limit=${this.limit}`)
        .then((response) => {
          this.users = response.data;
          // this.$store.commit(MUTATIONS.SET_USERS_PAGE, {
          //   page: this.page,
          //   users: this.users,
          // });
          this.totalItems = response.headers['x-total-count'];
          this.updatePagination();
        });
    },
    selectUser(userId) {
      this.$store.commit(MUTATIONS.SET_USERS_PAGE, {
        page: this.page,
        users: [this.users.find((user) => user.id === userId)],
      });
      this.$router.push({
        path: `/user/${userId}`,
      });
    },
    async selectPage(page) {
      await this.$router.push({
        query: {
          page,
        },
      });
      this.page = page;
      await this.loadCurrentPage();
      // const { userTable } = this.$refs;
      // userTable.$el.focus();
    },
    updatePagination() {
      this.totalPages = Math.ceil(this.totalItems / this.limit);
    },
  },
};
</script>

<style scoped lang="scss">
.pagination{
  margin-top: 1em;
}
</style>
