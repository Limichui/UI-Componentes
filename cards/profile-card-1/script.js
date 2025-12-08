const toggleBtn = document.getElementById("toggle-dark");

toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Cambiar texto del botón según el modo
    if (document.body.classList.contains("dark-mode")) {
        toggleBtn.textContent = "☀️";
    } else {
        toggleBtn.textContent = "🌙";
    }
});
