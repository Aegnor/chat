<template>
    <article class="chat">
        <ChatSidebar/>
        <div class="container">
            <ChatMessages/>
            <form action="#" class="message-form d-flex" @submit.prevent="submit">
                <label for="message" class="visually-hidden">Type here message</label>
                <input
                    id="message"
                    name="message"
                    type="text"
                    class="message-input"
                    v-model="message"
                >
                <button type="submit" class="btn message-submit">Send</button>
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

        this.socket().on('chat message', msg => {
            this.addMessage(msg)
        })
    },
    data() {
        return {
            message: ''
        }
    },
    methods: {
        ...mapMutations(['connectSocket', 'addMessage']),
        ...mapGetters(['socket']),
        async submit() {
            await this.socket().emit('chat message', this.message)

            this.message = ''
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
