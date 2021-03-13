<template>
    <div class="home">
    </div>
</template>

<script>
export default {
    name: 'Home',
    mounted() {
        console.log(this.$store.getters.user)
    }
}
</script>
