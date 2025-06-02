<template>
    <div class="root">
        <input
            ref="input"
            :style="inputStyle"
            type="text"
            :placeholder="label"
            :value="value"
            @input="handleValueChanged"
            @focus="handleFocus"
        />
    </div>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            required: true,
        },
        value: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            name: "",
        };
    },
    onMounted() {
        const inputRef = this.$refs.input;
        inputRef.value.focus();
    },
    methods: {
        handleValueChanged(event) {
            this.$emit("valueUpdated", event.target.value);
        },
        handleFocus(event) {
            console.error(JSON.stringify(event));
            const inputRef = this.$refs.input;
            setTimeout(() => {
                if (document.activeElement === inputRef.current) {
                    inputRef.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                    });
                }
            }, 300);
        },
    },
    computed: {
        inputStyle: {
            get() {
                const borderColor = this.value === "" ? "#922b21" : "black";
                return {
                    margin: "0mm",
                    padding: "0mm",
                    width: "96%",
                    height: "8mm",
                    textAlign: "center",
                    fontSize: "5.5mm",
                    borderRadius: "1mm",
                    borderWidth: "1mm",
                    borderStyle: "solid",
                    borderColor: borderColor,
                    background: "white",
                };
            },
        },
    },
};
</script>

<style scoped>
.root {
    position: relative;
    width: 100%;
    margin: 0mm;
    padding: 0mm;
    justify-self: center;
    justify-content: center;
    margin-bottom: 3mm;
}
</style>
