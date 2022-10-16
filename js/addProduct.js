import { createMenu } from "./components/adminMenu.js";
import { baseUrl } from "./settings/api.js";
import { getToken } from "./components/storage.js";
import displayMessage from "./components/displayMessage.js";

createMenu();

const form = document.querySelector("form");
const input = document.querySelector("input");
const name = document.querySelector("#name");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const checkbox = document.querySelector("#checkbox");
const uploadFile = document.querySelector("#uploadFile");

const message = document.querySelector(".message-container");

form.addEventListener("submit", submitForm);
input.addEventListener("click", inputImage);
function inputImage() {
  let image = this.files;
}

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
    descriptionValue.length === 0 ||
    fileValue.length === 0
  ) {
    return displayMessage(
      "warning",
      "Something is missing",
      ".message-container"
    );
  }

  addProduct(nameValue, priceValue, descriptionValue, featuredValue, fileValue);
}

async function addProduct(name, price, description, featured, files) {
  const url = baseUrl;
  let formData = new FormData();

  const data = JSON.stringify({
    title: name,
    price: price,
    description: description,
    featured,
  });

  formData.append("files.image", files[0], files[0].name);
  formData.append("data", data);
  const token = getToken();

  const options = {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const json = await response.json();

    if (json.created_at) {
      displayMessage("success", "Product created", ".message-container");
      form.reset();
    }
    console.log(json);
  } catch (error) {
    displayMessage("error", "An error occured", ".message-container");
    console.log(error);
  }
}
