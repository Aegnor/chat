<template>
    <article class="chat">
        <ChatSidebar/>
        <div class="container">
            <ChatMessages/>
            <form action="#" class="message-form" @submit.prevent="submit">
                <fieldset :disabled="isFromDisabled" class="d-flex">
                    <label for="message" class="visually-hidden">Type here message</label>
                    <input
                        id="message"
                        name="message"
                        type="text"
                        class="message-input"
                        v-model="message"
                    >
                    <button type="submit" class="btn message-submit">Send</button>
                </fieldset>
            </form>
        </div>
    </article>
</template>

<script>
import {io} from 'socket.io-client'
import {mapMutations, mapGetters} from 'vuex'
import ChatSidebar from '@/components/chat/ChatSidebar'
import ChatMessages from '@/components/chat/ChatMessages'

export default {
    name: 'Chat',
    components: {
        ChatSidebar,
        ChatMessages
    },
    mounted() {
        this.connectSocket(io('http://localhost:3030'))

        this.socket().emit('user joined', this.$store.getters.user)

        this.socket().on('user joined', user => {
            this.addUser(user)
        })

        this.socket().on('user left', userId => {
            this.removeUser(userId)
        })

        this.socket().on('chat message', msg => {
            this.addMessage(msg)
        })
    },
    data() {
        return {
            message: '',
            isFromDisabled: false
        }
    },
    methods: {
        ...mapMutations(['connectSocket', 'addMessage', 'addUser', 'removeUser']),
        ...mapGetters(['socket']),
        async submit() {
            if (!this.message.trim()) {
                return
            }

            if (this.message.length > 200) {
                this.$store.dispatch('addNotification', {
                    type: 'error',
                    data: `Length must be less than 200 letters now - ${this.message.length}`
                })

                return
            }

            // @TODO: block sending message for 15sec on server
            await this.socket().emit('chat message', {
                user: this.$store.getters.user.login,
                message: this.message,
                messageId: this.$store.getters.user._id
            })

            this.message = ''
            this.isFromDisabled = true

            setTimeout(() => {
                this.isFromDisabled = false
            }, 15000)
        }
    }
}
</script>

<style lang="scss">
.message {
    &-form {
        justify-content: space-between;

        position: fixed;
        bottom: 0;
        width: calc(100% - 20px);
        max-width: 830px;
    }

    &-input {
        width: 80%;
        margin-right: 5px;
    }

    &-submit {
        width: 20%;
        border: 1px solid #3c9adf;
    }

    &-input,
    &-submit {
        border-radius: 0;
    }
}
</style>
