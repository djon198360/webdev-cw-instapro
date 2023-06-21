
//import { errorDiv } from "../index.js";
//export const errorDiv = document.querySelector(".app_error");
export function setError(errorDiv, message) {
 
return   errorDiv.innerHTML  = message;
}

/* export const setError = (message) => {
    errorDiv.textContent = message;
  }; */