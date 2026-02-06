import { WidgetBase } from "../abstracts/widgetBase.js";

export class Text extends WidgetBase {
    protected _element: HTMLDivElement | HTMLAnchorElement;

    get text(): string {
        return this._element.textContent;
    }
    set text(text: string) {
        this._element.textContent = text;
    }

    constructor(id: string | null, classes: string[], text: string, link: string | null = null) {
        super(id, classes);

        if (link == null) {
            this._element = document.createElement("div");
        } else {
            this._element = document.createElement("a");
            this._element.href = link;
        }
        this.text = text;

        this.setIdAndClasses();
    }
}