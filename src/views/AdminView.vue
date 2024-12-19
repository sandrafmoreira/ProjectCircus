<template>
    <h1>Dashboard de Admins!</h1>

    <h2>Users</h2>
    <div v-for="user in authenticationStore.users">
        <div v-if="!user.adminPermission">
        <h2>{{ user.email }}</h2>
        <h2>{{ user.firstName }}</h2>
        <h2>{{ user.lastName }}</h2>
        <button @click="removeUser(user.email, user.firstName, user.lastName)">Remover utilizador</button>
        </div>
    </div>
</template>

<script>
    import { useAuthenticationStore } from '@/stores/authentication';

    export default {
        data() {
            return {
                authenticationStore: useAuthenticationStore()
            }
        },

        methods: {
            removeUser(email, firstName, lastName) {
                this.authenticationStore.removeAccount(email)
                alert(`O utilizador ${firstName} ${lastName} foi removido com sucesso!`)
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>