<template>
    <section class="messages">
        <h3 class="visually-hidden">All messages</h3>
        <ul class="messages-list" v-if="messages.length">
            <li
                class="messages-item d-flex"
                v-for="message in messages"
                :key="message.id"
            >
                <div class="user">
                    <div class="user-control" v-if="user.role === 'admin' && !message.id === user._id">
                        <button class="user-control-button" aria-label="Mute User">Mute</button>
                        <button class="user-control-button" aria-label="Ban User">Ban</button>
                    </div>
                    <span>{{message.user}}:</span>
                </div>
                <p class="user-message"
                   :class="{'user-message-owner': message.id === user._id}"
                >{{message.text}}</p>
            </li>
        </ul>
        <p v-else class="text-center">Hello, type here your thought so others can see</p>
    </section>
</template>

<script>
export default {
    name: 'ChatMessages',
    data() {
        return {
            messages: this.$store.getters.messages,
            user: this.$store.getters.user
        }
    }
}
</script>

<style lang="scss">
.user {
    margin-right: 5px;
    min-width: 90px;

    &-message {
        padding: 5px;
        background-color: #3c9adf;

        &-owner {
            background-color: #fff;
            color: #000;
        }
    }

    &-control {
        margin-bottom: 5px;
        &-button {
            margin-right: 5px;
        }
    }
}

.messages {
    &-item {
        margin-bottom: 20px;
    }
}
</style>
