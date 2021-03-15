<template>
    <section class="notification-container container-small" v-if="notifications.length">
        <p class="message" v-for="note in notifications" :key="note.id">
            {{note.msg}}<br>
            {{note.id}}<br>
            {{note.type}}<br>
        </p>
    </section>
</template>

<script>
export default {
    name: 'Notification',
    data() {
        return {
            notifications: this.$store.getters.notifications
        }
    }
}
</script>

<style lang="scss">
.notification-container {
    position: fixed;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
}
</style>
