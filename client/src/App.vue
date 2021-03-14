<template>
    <router-link to="/">Go to Chat</router-link>
    <br>
    <router-link to="/auth">Auth</router-link>
    <router-view/>
</template>

<script>
import {io} from 'socket.io-client'

export default {
    mounted() {
        io('http://localhost:3030')
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/base.scss';
</style>
