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
      <tr v-for="user in users" :key="user.id" @click="$emit('selected', user.id)">
        <td>{{ user.name }}</td>
        <td>{{ user.email }}</td>
        <td>{{ user.phone }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'UserTable',
  data() {
    return {
    };
  },
  props: {
    users: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style scoped lang="scss">
thead > tr > td{
  font-weight: 600;
}
tbody > tr > td{
  cursor: pointer;
}
</style>
