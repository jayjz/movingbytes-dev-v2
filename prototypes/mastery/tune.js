// Prototype-only, opt-in controls. No storage or production integration.
document.querySelectorAll('[data-token]').forEach(input => {
    input.addEventListener('input', () => {
        document.documentElement.style.setProperty(input.dataset.token, input.value);
        input.nextElementSibling.textContent = input.value;
    });
});
