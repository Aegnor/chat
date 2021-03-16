<template>
    <main id="main-content">
        <Notification/>
        <router-view/>
    </main>
</template>

<script>
import {io} from 'socket.io-client'
import Notification from '@/components/Notification'

export default {
    components: {
        Notification
    },
    mounted() {
        io('http://localhost:3030')
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/base.scss';
</style>
