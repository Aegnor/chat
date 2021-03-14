<template>
    <a class="visually-hidden" href="#main-content">Go to main content</a>
    <nav class="main-navigation container-small">
        <ul>
            <li><router-link to="/">Go to Chat</router-link></li>
            <li><router-link to="/auth">Go to Auth</router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'Navbar'
}
</script>

<style lang="scss">
.main-navigation {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    ul {
        display: flex;
        justify-content: center;
    }

    li {
        margin-right: 20px;

        &:last-child {
            margin-right: 0;
        }
    }

    a {
        color: #fff;
        font-size: 1.6rem;
        text-decoration: none;
        text-transform: uppercase;
    }
}
</style>
