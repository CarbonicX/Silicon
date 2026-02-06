import { WidgetBase } from "../abstracts/widgetBase.js";

export class Footer extends WidgetBase {
    protected _element: HTMLElement;
    constructor(id: string | null, classes: string[], widget: WidgetBase) {
        super(id, classes);

        this._element = document.createElement("div");
        this._element.appendChild(widget.element);

        this.setIdAndClasses();
        this.addClassForElement("silib-footer");
    }
}