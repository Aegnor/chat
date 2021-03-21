<template>
    <main id="main-content">
        <Notification/>
        <router-view/>
    </main>
</template>

<script>
import Notification from '@/components/Notification'
import axios from 'axios'

export default {
    components: {
        Notification
    },
    async mounted() {
        try {
            const res = await axios.create({withCredentials: true}).get('api/v1/form')
            axios.defaults.headers.common['CSRF-Token'] = res.data.csrfToken
        } catch (e) {
            console.log(e)
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/base.scss';
</style>
