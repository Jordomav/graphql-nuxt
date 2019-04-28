<template>
    <div>
        <h1>{{user.lastName}}</h1>
        <ul>
            <li v-for="user of users">
                {{ user.firstName }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import {Component, Vue} from 'nuxt-property-decorator';
import gql from 'graphql-tag';

const usersQuery = gql`query {
  users {
    firstName
  }
}`;

const userQuery = gql`query {
  user(userId: 1) {
    lastName
  }
}`;

@Component({
    apollo: {
        users: usersQuery,
        user: userQuery
    }
})
export default class Home extends Vue {
    test = 'test';

    mounted() {
        this.$apolloHelpers.onLogin(1);
    }
}
</script>

<style scoped>
</style>
