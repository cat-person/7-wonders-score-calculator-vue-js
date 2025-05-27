<template>
    <main class="root">
        <RouterView />
    </main>
</template>

<script>
export default {
    name: "App",
};
</script>

<style>
#app {
    margin: 0mm;
    padding: 0mm;
    font-family: "open-sans";
    user-select: none;
    text-align: center;
}

.root {
    width: 100%;
    margin: 0mm;
    padding: 0mm;
    max-width: 160mm;
    justify-self: center;
    position: relative;
}
</style>
