import { removeLocalStorage } from "./components/storage.js";

export function logOut() {
  const button = document.querySelector("#logout");

  if (button) {
    button.onclick = function () {
      const doLogout = confirm("Are you sure?");

      if (doLogout) {
        removeLocalStorage();
        location.href = "/login.html";
      }
    };
  }
}
