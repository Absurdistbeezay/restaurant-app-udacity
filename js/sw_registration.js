if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("./sw.js")
    .then(() => console.log("Registration completed!"))
    .catch(() => console.log("Registration failed!"));
}
