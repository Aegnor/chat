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
                @click="removeNotification(note.id)"
            >close</button>
        </div>
    </section>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
    name: 'Notification',
    data() {
        return {
            notifications: this.$store.getters.notifications
        }
    },
    methods: {
        ...mapMutations(['deleteNotification']),
        removeNotification(id) {
            this.deleteNotification(id)
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
