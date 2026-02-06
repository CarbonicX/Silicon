import { WidgetBase } from "../abstracts/widgetBase.js";

type callback = (() => any) | null

export class Button extends WidgetBase {
    protected _element: HTMLButtonElement;
    
    private _text!: string;
    get text(): string {
        return this._text;
    }
    set text(text: string) {
        this._text = text;
        this._element.textContent = text;
    }

    private _onclick!: callback;
    get onclick(): callback {
        return this._onclick
    }
    set onclick(func: callback) {
        this._onclick = func;
        this._element.onclick = func;
    }

    constructor(id: string | null, classes: string[],
        text: string, onclick: (() => any) | null = null) {
        super(id, classes);

        this._element = document.createElement("button");
        this.text = text;
        if (onclick != null) {
            this.onclick = onclick;
        }

        this.setIdAndClasses();
    }
}