import { getUsername } from "./storage.js";

export function createMenu() {
  const { pathname } = document.location;

  const username = getUsername();

  let authLink = `<a href="admin.html" class="${
    pathname === "admin.html" ? "active" : ""
  }">Admin</a>`;

  if (username) {
    authLink = `<a class="admin-name" href="admin.html"> Hi ${username}</a>`;
  }

  const menuContainer = document.querySelector(".menu-container");
  menuContainer.innerHTML = `
  
    <div class="menu">
        ${authLink}
        <a type="button" class="btn btn-primary btn-sm add" href="addProduct.html" small>Add product</a>
        <button type="button" id="logout" class="btn btn-primary btn-sm" small>Logout</button>
    </div>
  
  `;
}
