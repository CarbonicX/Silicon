import { ComplexWidgetBase, WidgetBase } from "../abstracts/widgetBase.js";
export class StretchContainer extends ComplexWidgetBase {
    _element;
    // 重载时需要：
    // 设置 mode
    constructor(id, classes, children) {
        super(id, classes);
        this.children = children;
        this._element = document.createElement("div");
        this.each((widget) => {
            this._element.appendChild(widget.element);
        });
    }
    addChild(child) {
        super.addChild(child);
        this._element.appendChild(child.element);
    }
    removeChild(child) {
        this.children = this.children.filter(c => c != child);
        this._element.removeChild(child.element);
    }
    removeChildById(id) {
        let child = this.findId(id);
        if (child == undefined)
            throw new Error("Cannot find id \"" + id + "\"");
        this.removeChild(child);
    }
    style(style) {
        this._element.style.gap = style.gap.toString() + "px";
        if (style.padding != undefined)
            this._element.style.padding = style.padding.toString() + "px";
    }
}
//# sourceMappingURL=stretchContainer.js.map