import initialRender from "./initialRender.js";
import listener from "./listener.js";
import observer from "./observer.js";


class Invoice {
    init(){
        console.log("Invoice App initialized");
        observer();
        initialRender();
        listener();
        
    }
}

export default Invoice;