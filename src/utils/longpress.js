export default {
  install(app) {
    app.directive("longpress", {
      mounted(el, binding) {
        let pressTimer = null;
        let intervalTimer = null;

        // Get handler and config
        const handler =
          typeof binding.value === "function"
            ? binding.value
            : binding.value?.handler;
        const config = typeof binding.value === "object" ? binding.value : {};

        if (typeof handler !== "function") {
          throw new Error(
            "v-longpress requires a function or an object with handler function",
          );
        }

        const start = (e) => {
          console.error(e.type);
          if (e.type === "click" && e.button !== 0) return;

          // Clear any existing timers
          cancel();

          // Initial delay (default: 300ms)
          const delay = parseInt(binding.arg) || config.delay || 300;
          const interval = config.interval || 50;

          pressTimer = setTimeout(() => {
            // First execution
            handler(e);

            // Subsequent executions at interval
            if (interval > 0) {
              intervalTimer = setInterval(() => {
                handler(e);
              }, interval);
            }
          }, delay);
        };

        const cancel = () => {
          if (pressTimer !== null) {
            clearTimeout(pressTimer);
            pressTimer = null;
          }
          if (intervalTimer !== null) {
            clearInterval(intervalTimer);
            intervalTimer = null;
          }
        };

        // Add event listeners
        el.addEventListener("mousedown", start);
        el.addEventListener("touchstart", start);

        // Cancel on release events
        el.addEventListener("click", cancel);
        el.addEventListener("mouseup", cancel);
        el.addEventListener("mouseleave", cancel);
        el.addEventListener("touchend", cancel);
        el.addEventListener("touchcancel", cancel);
      },
    });
  },
};
