import { ComplexWidgetBase, WidgetBase } from "../abstracts/widgetBase.js";

export class Footer extends ComplexWidgetBase {
    protected _element: HTMLElement;
    constructor(id: string | null, classes: string[], widget: WidgetBase) {
        super(id, classes);

        this._element = document.createElement("div");
        this.addChild(widget);

        this.setIdAndClasses();
        this.addClassForElement("silib-footer");
    }
}