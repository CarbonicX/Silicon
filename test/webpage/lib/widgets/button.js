import { WidgetBase } from "../abstracts/widgetBase.js";
export class Button extends WidgetBase {
    _element;
    _text;
    get text() {
        return this._text;
    }
    set text(text) {
        this._text = text;
        this._element.textContent = text;
    }
    _onclick;
    get onclick() {
        return this._onclick;
    }
    set onclick(func) {
        this._onclick = func;
        this._element.onclick = func;
    }
    constructor(id, classes, text, onclick = null) {
        super(id, classes);
        this._element = document.createElement("button");
        this.text = text;
        if (onclick != null) {
            this.onclick = onclick;
        }
        this.setIdAndClasses();
    }
}
//# sourceMappingURL=button.js.map