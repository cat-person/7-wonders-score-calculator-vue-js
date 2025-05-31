<template>
    <div class="root">
        <input
            ref="input"
            :style="inputStyle"
            type="text"
            :placeholder="label"
            :value="value"
            @input="handleValueChanged($event)"
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
    methods: {
        handleValueChanged($event) {
            this.$emit("valueUpdated", event.target.value);
        },
        handleFocus() {
          const inputRef = useTemplateRef("input");
          // Scroll element into view when keyboard appears
          setTimeout(() => {
              inputRef.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
              });
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
    justifyself: center;
    justifycontent: center;
    margin-bottom: 3mm;
}
</style>
