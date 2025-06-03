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
    font-family: "Crimson Text", serif;
    font-weight: 300;
    text-align: center;
    overflow-y: scroll;
    user-select: none;
}

.root {
    width: 100%;
    margin: 0mm;
    padding: 0mm;
    padding-top: 3mm;
    padding-bottom: 3mm;
    max-width: 160mm;
    justify-self: center;
    background-color: aliceblue;
}
</style>
