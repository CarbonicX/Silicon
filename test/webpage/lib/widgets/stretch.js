import { WidgetBase } from "../abstracts/widgetBase.js";
export class Stretch extends WidgetBase {
    _element;
    _proportion;
    get proportion() {
        return this._proportion;
    }
    set proportion(proportion) {
        this._proportion = proportion;
        this._element.style = "flex-grow: " + proportion;
    }
    constructor(id, classes, proportion) {
        super(id, classes);
        this._element = document.createElement("div");
        this.proportion = proportion;
        this.setIdAndClasses();
    }
}
//# sourceMappingURL=stretch.js.map