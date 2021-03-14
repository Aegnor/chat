<template>
    <div class="chat">
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
