import { manageInventoryBtnHandler, closeSideBarBtnHandler, checkOutHandler } from "./handlers";
import { manageInventoryBtn, closeSideBarBtn, addNewProductBtn, createRecordForm, recordGroup, checkOut } from "./selectors";
import { addNewProductBtnHandler } from "./inventory";
import { createRecordFormHandler, recordGroupHandler } from "./record";

const listener = () => {
     manageInventoryBtn.addEventListener("click", manageInventoryBtnHandler);
     closeSideBarBtn.addEventListener("click", closeSideBarBtnHandler);
     addNewProductBtn.addEventListener("click", addNewProductBtnHandler);
     createRecordForm.addEventListener("submit", createRecordFormHandler);
     recordGroup.addEventListener("click", recordGroupHandler);
     checkOut.addEventListener("click", checkOutHandler);
}
export default listener;

