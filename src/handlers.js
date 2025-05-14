import { productSideBar } from "./selectors";

export const manageInventoryBtnHandler = () => {
 productSideBar.classList.remove("translate-x-full");
 productSideBar.classList.remove("duration-300");

};

export const closeSideBarBtnHandler = () => {
 productSideBar.classList.add("translate-x-full"); 
};

export const checkOutHandler = () => {
  console.log("Check out");
  window.print();
};