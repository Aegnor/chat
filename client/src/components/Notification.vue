<template>
    <section class="notification-container container-small" v-if="notifications.length">
        <div
            v-for="note in notifications"
            :key="note.id"
            class="message"
            :class="{
                error: note.type === 'error',
                success: note.type === 'success',
            }"
        >
            <p>{{note.msg}}</p>
            <button
                type="button"
                aria-label="Remove notification"
                @click="handleRemoveNotification(note.id)"
            >close</button>
        </div>
    </section>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    name: 'Notification',
    data() {
        return {
            notifications: this.$store.getters.notifications
        }
    },
    methods: {
        ...mapActions(['removeNotification']),
        handleRemoveNotification(id) {
            this.removeNotification(id)
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
