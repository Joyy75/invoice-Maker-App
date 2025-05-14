import { createRecordForm, recordGroup, recordRowTemplate, recordTotal } from "./selectors";
import { products } from "./states";
import { v4 as uuidv4 } from 'uuid';
import Swal from "sweetalert2";

export const createRecordFormHandler = () => {
  event.preventDefault();
  // console.log("u submit form");
  const formData = new FormData(createRecordForm);
  // console.log(formData.get("product_select"));
  // console.log(formData.get("quantity"));

  const currentProduct = products.find(({ id }) => id == formData.get("product_select"));

  const isExistedRecord = document.querySelector(`[product-id='${currentProduct.id}']`);

  if (isExistedRecord === null) {
    recordGroup.append(createRecordRow(currentProduct, formData.get("quantity")));
  } else {
    Swal.fire({
      title: `Are you sure to add quantity to ${currentProduct.name}?`,
      text: "You won't be able to revert this!",
      icon: "question",
      iconColor: "#3085d6",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, add it!"

    }).then((result) => {
      if (result.isConfirmed) {
        updateRecordQuantity(isExistedRecord.getAttribute("row-id"), parseInt(formData.get("quantity")));
      }
    });
  }
  createRecordForm.reset();
};


export const createRecordRow = ({ id, name, price }, quantity) => {
  const recordRow = recordRowTemplate.content.cloneNode(true);
  const recordProductName = recordRow.querySelector(".record-product-name");

  const recordProductPrice = recordRow.querySelector(".record-product-price");
  const recordQuantity = recordRow.querySelector(".record-quantity");
  const recordCost = recordRow.querySelector(".record-cost");

  const currentRecordRow = recordRow.querySelector(".record-row");

  currentRecordRow.setAttribute("product-id", id);
  currentRecordRow.setAttribute("row-id", uuidv4());

  recordProductName.innerText = name;
  recordProductPrice.innerText = price;
  recordQuantity.innerText = quantity;
  recordCost.innerText = price * quantity;

  return recordRow;
};

export const calculateTax = (amount, percentage = 5) => (amount / 100) * percentage;

export const calculateRecordCostTotal = () => {
  let total = 0;
  recordGroup.querySelectorAll(".record-cost").forEach((el) => (total += parseFloat(el.innerText)));
  return total;
};

export const removeRecord = (rowId) => {
  Swal.fire({
    title: "Are you sure to delete?",
    text: "You won't be able to revert this!",
    icon: "question",
    iconColor: "#3085d6",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      // recordGroup.querySelector(`#${rowId}`).remove();
      const currentRecordRow = document.querySelector(`[row-id ='${rowId}']`);
      currentRecordRow.remove();



      Swal.fire({
        title: "Deleted!",
        text: "Your record has been deleted.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
    }
  });
};

export const quantityAdd = (rowId) => {
  const currentRecordRow = document.querySelector(`[row-id ='${rowId}']`);
  const recordProductPrice = currentRecordRow.querySelector(".record-product-price");
  const recordQuantity = currentRecordRow.querySelector(".record-quantity");
  const recordCost = currentRecordRow.querySelector(".record-cost");

  recordQuantity.innerText = parseInt(recordQuantity.innerText) + 1;
  recordCost.innerText = recordProductPrice.innerText * recordQuantity.innerText;
};

export const quantitySubtract = (rowId) => {
  const currentRecordRow = document.querySelector(`[row-id ='${rowId}']`);
  const recordProductPrice = currentRecordRow.querySelector(".record-product-price");
  const recordQuantity = currentRecordRow.querySelector(".record-quantity");
  const recordCost = currentRecordRow.querySelector(".record-cost");

  if (recordQuantity.innerText > 1) {
    recordQuantity.innerText = parseInt(recordQuantity.innerText) - 1;
    recordCost.innerText = recordProductPrice.innerText * recordQuantity.innerText;
  }
};

export const updateRecordQuantity = (rowId, newQuantity) => {
  const currentRecordRow = document.querySelector(`[row-id ='${rowId}']`);
  const recordProductPrice = currentRecordRow.querySelector(".record-product-price");
  const recordQuantity = currentRecordRow.querySelector(".record-quantity");
  const recordCost = currentRecordRow.querySelector(".record-cost");

  if (newQuantity > 0 || recordQuantity.innerText > 1) {
    recordQuantity.innerText = parseInt(recordQuantity.innerText) + newQuantity;
    recordCost.innerText = recordProductPrice.innerText * recordQuantity.innerText;
  }

};

export const recordGroupHandler = (event) => {
  if (event.target.classList.contains("record-remove")) {
    const currentRecordRow = event.target.closest(".record-row");
    removeRecord(currentRecordRow.getAttribute("row-id"));
  } else if (event.target.classList.contains("quantity-add")) {
    const currentRecordRow = event.target.closest(".record-row");
    updateRecordQuantity(currentRecordRow.getAttribute("row-id"), 1);

  } else if (event.target.classList.contains("quantity-sub")) {
    const currentRecordRow = event.target.closest(".record-row");
    updateRecordQuantity(currentRecordRow.getAttribute("row-id"), -1);
  }
};

export const recordGroupObserver = () => {
  const observerOptions = {
    childList: true,
    subtree: true,
  };

  const updateTotal = () => {
    const total = calculateRecordCostTotal();
    const tax = calculateTax(total);
    recordTotal.innerText = total;
    recordTax.innerText = tax;
    recordNetTotal.innerText = total + tax;
  };

  const observer = new MutationObserver(updateTotal);
  observer.observe(recordGroup, observerOptions);
};