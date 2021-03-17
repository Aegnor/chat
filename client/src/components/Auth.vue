<template>
    <section class="section auth container-small" v-if="user">
        <p class="text-center">You are already log in</p>
        <button @click="handleLogout" type="button" class="form-submit btn">Logout</button>
    </section>
    <section class="section auth container-small" v-else>
        <h1>Authentication</h1>
        <form class="form" @submit.prevent="submit">
            <fieldset class="form-field">
                <label for="login" class="form-label">Login</label>
                <input
                    type="text"
                    name="login"
                    id="login"
                    class="form-control"
                    placeholder="It can be username or email address"
                    minlength="3"
                    title="It can be username or email address"
                    required
                    v-model="login"
                />
            </fieldset>
            <fieldset class="form-field">
                <label for="password" class="form-label">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    class="form-control"
                    placeholder="Enter Password"
                    minlength="5"
                    title="Password must be between 5 and 15 characters"
                    required
                    v-model="password"
                />
            </fieldset>
            <button type="submit" class="form-submit btn" :disabled="isFormDisabled">Login</button>
        </form>
    </section>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data() {
        return {
            login: '',
            password: '',
            user: this.$store.getters.user,
            isFormDisabled: false
        }
    },
    methods: {
        ...mapActions(['authentication', 'logout']),
        async submit() {
            try {
                this.isFormDisabled = true
                const authAction = await this.authentication({
                    login: this.login,
                    password: this.password
                })

                if (authAction) {
                    await this.$router.push('/')
                } else {
                    this.isFormDisabled = false
                }
            } catch (e) {
                console.log(e)
            }
        },
        handleLogout() {
            this.logout()
        }
    }
}
</script>

<style lang="scss">
.auth {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.form {
    margin-top: 20px;

    &-label {
        display: block;
        margin-bottom: 1rem;
    }

    &-control {
        width: 100%;
        margin-bottom: 1.5rem;
    }

    &-submit {
        width: 100%;
        margin-top: 1.5rem;
    }

    &-info {
        text-align: center;
    }
}
</style>
