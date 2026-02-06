import { ComplexWidgetBase, WidgetBase } from "../abstracts/widgetBase.js";

export class Nav extends ComplexWidgetBase {
    protected _element: HTMLElement;
    constructor(id: string | null, classes: string[], widget: WidgetBase) {
        super(id, classes);

        this._element = document.createElement("nav");
        this.addChild(widget);

        this.setIdAndClasses();
    }

    style(content: HTMLElement | WidgetBase, height: number = 70) {
        if (content instanceof WidgetBase) {
            content = content.element;
        }
        this._element.style.height = `${height}px`;
        content.style.paddingTop = `${height}px`;
    }
}