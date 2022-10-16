import { baseUrl } from "./settings/api.js";
import displayMessage from "./components/displayMessage.js";
import { createMenu } from "./components/adminMenu.js";
import { getToken } from "./components/storage.js";
import { deleteButton } from "./components/deleteBtn.js";

createMenu();

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

if (!id) {
  document.location.href = "/";
}

const productUrl = baseUrl + id;

const form = document.querySelector("form");
const message = document.querySelector(".message-container");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const checkbox = document.querySelector("#checkbox");
const uploadFile = document.querySelector("#uploadFile");

const loading = document.querySelector(".loading");

(async function () {
  try {
    const response = await fetch(productUrl);
    const details = await response.json();
    console.log(details);

    name.value = details.title;
    price.value = details.price;
    description.value = details.description;
    uploadFile.value = "";
    loading.value = details.featured;

    deleteButton(details.id);
  } catch (error) {
    console.log(error);
  } finally {
    loading.style.display = "none";
    form.style.display = "block";
  }
})();

form.addEventListener("submit", submitForm);

function submitForm(event) {
  event.preventDefault();

  message.innerHTML = "";

  const nameValue = name.value.trim();
  const priceValue = parseFloat(price.value);
  const descriptionValue = description.value.trim();
  const fileValue = uploadFile.files;
  const featuredValue = checkbox.checked;

  if (
    nameValue.length === 0 ||
    priceValue.length === 0 ||
    isNaN(priceValue) ||
    descriptionValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "Something is missing",
      ".message-container"
    );
  }
  updateProduct(
    nameValue,
    priceValue,
    descriptionValue,
    fileValue,
    featuredValue,
    id
  );
}

async function updateProduct(name, price, description, files, featured, id) {
  const url = baseUrl + id;
  let formData = new FormData();

  const data = JSON.stringify({
    title: name,
    price: price,
    description: description,
    featured,
    id,
  });

  formData.append("files.image", files[0], files[0].name);
  formData.append("data", data);
  const token = getToken();

  const options = {
    method: "PUT",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (files[0].name === null) {
      if (json.updated_at) {
        displayMessage("success", "Product updated", ".message-container");
      }

      if (json.error) {
        displayMessage("error", json.message, ".message-container");
      }
    }
  } catch (error) {
    console.log(error);
  }
}
