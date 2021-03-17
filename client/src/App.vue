<template>
    <main id="main-content">
        <Notification/>
        <router-view/>
    </main>
</template>

<script>
import Notification from '@/components/Notification'

export default {
    components: {
        Notification
    }
}
</script>

<style lang="scss">
@import '@/assets/styles/base.scss';
</style>
