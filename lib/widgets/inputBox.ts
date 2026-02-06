import { WidgetBase } from "../abstracts/widgetBase.js";

export class InputBox extends WidgetBase {
    functions: string[] = ["stretchable"];
    protected _element: HTMLInputElement;

    get value(): string {
        return this._element.value;
    }
    set value(value: string) {
        this._element.value = value;
    }

    constructor(id: string | null, classes: string[]) {
        super(id, classes);

        this._element = document.createElement("input");
        this._element.type = "text";

        this.setIdAndClasses();
        this.addClassForElement("silib-inputbox");
    }
}