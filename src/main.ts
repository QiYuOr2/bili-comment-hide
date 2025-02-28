import { createApp } from "vue";
import App from "./App.vue";
import "virtual:uno.css";
import "@unocss/reset/normalize.css";

createApp(App).mount(
  (() => {
    const app = document.createElement("div");
    document.body.append(app);
    return app;
  })()
);