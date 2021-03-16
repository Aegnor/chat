<template>
    <div class="container">
        <ul class="messages-list">
            <li class="messages-item">
                <p class="user">User:</p>
                <p class="user-message">It’s a new way to communicate — faster than email and more focused than chat. It’s a new way to communicate — faster than email and more focused than chat.</p>
            </li>
            <li class="messages-item">
                <p class="user">It’s a new way 2:</p>
                <p class="user-message user-message-owner">It’s a new way to communicate—faster than email and more focused than chat. It’s a new way to communicate — faster than email and more focused than chat.</p>
            </li>
        </ul>
        <form action="#" class="message-form">
            <label for="message" class="visually-hidden">Type here message</label>
            <input id="message" type="text" class="message-input">
            <button class="btn message-submit">Send</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'Chat',
    mounted() {
        console.log(this.$store.getters.user)
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
        display: flex;
        margin-bottom: 20px;
    }
}

.message {
    &-form {
        display: flex;
        justify-content: space-between;
        position: fixed;
        bottom: 0;
        width: 830px;
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
