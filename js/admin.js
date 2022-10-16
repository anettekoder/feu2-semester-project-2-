import { baseUrl } from "./settings/api.js";
import { createMenu } from "./components/adminMenu.js";
import { logOut } from "./logOut.js";

const productList = document.getElementById("product-list");
let itemsId = "";
createMenu();

let product = [];

const loadProductList = async () => {
  try {
    const res = await fetch(baseUrl);
    product = await res.json();
    displayProductList(product);
  } catch (error) {
    console.log(error);
  }
};

const displayProductList = (products) => {
  const htmlString = products.map((items) => {
    itemsId = items.id;

    return `

       
           <ul class="list-group">
               <li class="list-group-item">
                    <img class="img-thumbnail" src="http://localhost:1337${items.image.formats.small.url}"
                     alt="${items.image.alternativeText}">
                    <label class="name" text-center>
                      <a href="details.html?id=${items.id}">${items.title}<br></a>
                    </label>
                    <label class="edit-btns text-center">
                      <a href="edit.html?id=${items.id}"><button class="btn btn-primary btn-sm"><i class="fas fa-pen"></i></button></a>  
                    </label>
                    <div class="break"></div>
               </li>
            </ul>
       





        `;
  });

  productList.innerHTML = htmlString.join("");
};

logOut();
loadProductList();
