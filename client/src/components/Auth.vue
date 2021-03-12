<template>
    <section class="section login container-small">
        <h1>Authentication</h1>
        <form class="form" @submit.prevent="submit">
            <div class="form-field">
                <label for="login" class="form-label">Login</label>
                <input
                    type="text"
                    name="login"
                    id="login"
                    class="form-control"
                    placeholder="It can be username or email address"
                    minlength="3"
                    required
                    v-model="login"
                />
            </div>
            <div class="form-field">
                <label for="password" class="form-label">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    class="form-control"
                    placeholder="Enter Password"
                    pattern=".{5,15}"
                    title="Password must be between 5 and 15 characters"
                    required
                    v-model="password"
                />
            </div>
            <button type="submit" class="form-submit btn">Login</button>
        </form>
    </section>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    data() {
        return {
            login: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(['authentication']),
        async submit() {
            await this.authentication({
                login: this.login,
                password: this.password
            })
        }
    }
}
</script>

<style lang="scss">
.login {
    min-height: 100vh;
    max-width: 550px;
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
