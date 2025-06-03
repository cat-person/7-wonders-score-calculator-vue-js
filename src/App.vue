<template>
    <main class="root">
        <RouterView />
        <div style="flex-grow: 1" />
        <button class="change-language" @click="handleChangeLanguage">
            Change Language ({{ $i18n.locale }})
        </button>
    </main>
</template>

<script>
export default {
    name: "App",
    methods: {
        handleChangeLanguage() {
            if (this.$i18n.locale === "en") {
                this.$i18n.locale = "ru";
            } else {
                this.$i18n.locale = "en";
            }
        },
    },
};
</script>

<style>
#app {
    margin: 0mm;
    padding: 0mm;
    font-family: "Roboto Condensed", sans-serif;
    text-align: center;
    overflow-y: scroll;
    user-select: none;
}

.root {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    margin: 0mm;
    padding: 0mm;
    padding-top: 3mm;
    max-width: 160mm;
    justify-self: center;
    justify-content: center;
    background-color: aliceblue;
}

.change-language {
    align-self: center;
    width: 60mm;
    margin: 0mm;
    margin-top: 24mm;
    margin-bottom: 3mm;
}
</style>
