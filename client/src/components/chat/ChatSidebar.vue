<template>
    <aside class="chat-sidebar" v-if="users.length">
        <h2 class="visually-hidden">List of online users</h2>
        <ul class="users-list">
            <li v-for="user in users" :key="user._id"><span>{{user.login}}</span> are online</li>
        </ul>
    </aside>
</template>

<script>
export default {
    name: 'ChatSidebar',
    data() {
        return {
            users: this.$store.getters.users
        }
    }
}
</script>

<style lang="scss">
.chat-sidebar {
    position: absolute;
    left: 0;
    top: 0;
    width: 25%;
    max-width: 300px;
    padding: 10px;

    @include responsive(1240) {
        position: static;
        max-width: 850px;
        margin: 0 auto;
        width: auto;
    }

    li {
        font-size: 1.6rem;
        margin-bottom: 10px;
    }
}
</style>
