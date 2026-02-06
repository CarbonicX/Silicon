import { WidgetBase } from "../abstracts/widgetBase.js";
export class Text extends WidgetBase {
    _element;
    get text() {
        return this._element.textContent;
    }
    set text(text) {
        this._element.textContent = text;
    }
    constructor(id, classes, text, link = null) {
        super(id, classes);
        if (link == null) {
            this._element = document.createElement("div");
        }
        else {
            this._element = document.createElement("a");
            this._element.href = link;
        }
        this.text = text;
        this.setIdAndClasses();
    }
}
//# sourceMappingURL=text.js.map