

const appEl = document.getElementById("app");
export const setError = (message) => {
    appEl.querySelector(".form-error").textContent = message;
  };