
// register service worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
    navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
        console.log("success");
        })
        .catch(function() {
        console.log("failed");
        });
    });
} else {
    console.log("not support");
}  