<template>
    <div>
        <h1>User Account Page 😊</h1>
        <h2>Olá {{ userInfo.email }}!!</h2>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: JSON.parse(localStorage.getItem("userInfo"))
            }
        },
    }
</script>

<style lang="scss" scoped>

</style>