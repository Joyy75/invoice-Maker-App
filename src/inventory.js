import { newProductName, newProductPrice, productCardTemplate, productGroup, productSelect } from "./selectors";
import { v4 as uuidv4 } from 'uuid';
import { products } from "./states";

export const addNewProductBtnHandler = () => {

    const name = newProductName.value.trim();
    const price = newProductPrice.value.trim();

   
    if (name === "" || price === "" || isNaN(Number(price))) {
        alert("U Must Fill Product Name and Price Correctly");
        return;
    }
    //  console.log("new product added");
    const createId = uuidv4();
    productGroup.append(
    createProductCard(createId, newProductName.value, newProductPrice.valueAsNumber));    
    productSelect.append(new Option(`${newProductName.value} __ ${newProductPrice.valueAsNumber}`, createId));

    products.push({
        id: createId,
        name: newProductName.value,
        price: newProductPrice.valueAsNumber
    });

    console.log(products);

    newProductName.value = null;
    newProductPrice.value = null;

};

export const productRender = () => {
  products.forEach(({id, name, price}) => {
     productGroup.append(
        createProductCard(id, name, price));
     productSelect.append(new Option(`${name} __ ${price}`, id));    
});   
};

export const createProductCard = (id, name, price) => {
    const productCard = productCardTemplate.content.cloneNode(true);
    const currentProductCard = productCard.querySelector(".product-card");
    const productName = productCard.querySelector(".product-name");
    const productPrice = productCard.querySelector(".product-price");

    currentProductCard.id = id;

    productName.innerText = name;
    productPrice.innerText = price;

    return productCard;
};

