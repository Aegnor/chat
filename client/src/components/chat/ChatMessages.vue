<template>
    <section class="messages">
        <h3 class="visually-hidden">All messages</h3>
        <ul class="messages-list" v-if="messages.length">
            <li
                class="messages-item d-flex"
                v-for="message in messages"
                :key="message.id"
            >
                <p class="user">{{message.user}}:</p>
                <p class="user-message"
                   :class="{
                            'user-message-owner': message.id
                        }"
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
            messages: this.$store.getters.messages
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
}

.messages {
    &-item {
        margin-bottom: 20px;
    }
}
</style>
