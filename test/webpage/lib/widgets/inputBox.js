import { WidgetBase } from "../abstracts/widgetBase.js";
export class InputBox extends WidgetBase {
    functions = ["stretchable"];
    _element;
    get value() {
        return this._element.value;
    }
    set value(value) {
        this._element.value = value;
    }
    constructor(id, classes) {
        super(id, classes);
        this._element = document.createElement("input");
        this._element.type = "text";
        this.setIdAndClasses();
    }
}
//# sourceMappingURL=inputBox.js.map