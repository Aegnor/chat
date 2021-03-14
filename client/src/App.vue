<template>
    <Navbar/>
    <main id="main-content">
        <Notification/>
        <router-view/>
    </main>
</template>

<script>
import {io} from 'socket.io-client'
import Notification from '@/components/Notification'
import Navbar from '@/components/Navbar'

export default {
    components: {
        Notification,
        Navbar
    },
    mounted() {
        io('http://localhost:3030')
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/base.scss';
</style>
