<template>
    <main class="root">
        <RouterView />
    </main>
</template>

<script>
export default {
    name: "App",
};

// Auto-scroll implementation
document.addEventListener("DOMContentLoaded", function () {
    const inputs = document.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
        input.addEventListener("focus", function () {
            // Timeout ensures this runs after the keyboard appears
            setTimeout(() => {
                // Scroll the input into view with some padding
                this.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });

                // Additional offset if needed (for fixed headers)
                const headerHeight =
                    document.querySelector(".header").offsetHeight;
                window.scrollBy(0, -headerHeight - 10);
            }, 300);
        });
    });
});
</script>

<style>
#app {
    margin: 0mm;
    padding: 0mm;
    font-family: "open-sans";
    user-select: none;
    text-align: center;
    overflow-y: scroll;
}

.root {
    width: 100%;
    margin: 0mm;
    padding: 0mm;
    padding-bottom: 60mm;
    max-width: 160mm;
    justify-self: center;
    position: relative;
}
</style>
