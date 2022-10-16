import { baseUrl } from "../settings/api.js";
import { getToken } from "./storage.js";

export function deleteButton(id) {
  const container = document.querySelector(".deleteBtn-container");

  container.innerHTML = `<button type="button" class="delete btn-danger">Delete</button>`;

  const button = document.querySelector("button.delete");

  button.onclick = async function () {
    console.log(id);

    const deleteItem = confirm("Are you sure you want to delete this?");
    console.log(deleteItem);

    if (deleteItem) {
      const url = baseUrl + id;

      const token = getToken();

      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const response = await fetch(url, options);
        const json = await response.json();

        location.href = "/admin.html";

        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
  };
}
