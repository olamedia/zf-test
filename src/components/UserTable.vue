<template>
  <table cellpadding="5" border="1">
    <thead>
      <tr>
        <td>Имя</td>
        <td>E-mail</td>
        <td>Телефон</td>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in allUsers" :key="user.id" @click="$emit('selected', user.id)">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { PropType } from 'vue';
import { Component, Vue } from 'vue-property-decorator';
import User from '@/models/User';

const UserTableProps = Vue.extend({
  props: {
    users: {
      type: Array as PropType<User[]>,
      default: () => [],
    },
  },
});

@Component({
  components: {},
})
export default class UserTable extends UserTableProps {
  get allUsers(): User[] {
    return this.users;
  }
}
</script>

<style scoped lang="scss">
thead > tr > td{
  font-weight: 600;
}
tbody > tr > td{
  cursor: pointer;
}
</style>
