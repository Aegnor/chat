<template>
    <router-view/>
</template>

<script>
import { io } from 'socket.io-client'

export default {
    mounted() {
        io('http://localhost:3030')
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/base.scss';
</style>
