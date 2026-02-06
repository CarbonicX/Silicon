import { WidgetBase } from "../abstracts/widgetBase.js";

export interface IPageStyle {
    backgroundColor: string | undefined,
    foregroundColor: string | undefined,
    maxHeight: number | undefined,
    maxWidth: number | undefined, 
    padding: number | undefined
}

export class Page extends WidgetBase {
    protected _element: HTMLElement;
    private _mode!: string;
    get mode(): string {
        return this._mode;
    }
    set mode(mode: string) {
        if (!["card", "page"].includes(mode)) throw Error("Mode can only be \"card\" or \"page\"");
        this.removeClassForElement("silib-" + this._mode);
        this.addClassForElement("silib-" + mode);
        this._mode = mode;
    }
    
    // mode: card / page
    constructor(id: string | null, classes: string[], content: WidgetBase, mode: string) {
        super(id, classes);

        this._element = document.createElement("div");
        this._element.appendChild(content.element);
        this.mode = mode;

        this.setIdAndClasses();
    }

    // 需要在创建 Page 后调用
    style(parent: WidgetBase, settings: IPageStyle) {
        const parentElement = parent.element;

        if (settings.backgroundColor != undefined)
            parentElement.style.backgroundColor = settings.backgroundColor;

        if (settings.foregroundColor != undefined)
            this._element.style.backgroundColor = settings.foregroundColor;

        if (settings.maxHeight != undefined)
            this._element.style.maxHeight = settings.maxHeight.toString() + "px";

        if (settings.maxWidth != undefined)
            this._element.style.maxWidth = settings.maxWidth.toString() + "px";

        if (settings.padding != undefined)
            this._element.style.padding = settings.padding.toString() + "px";

        if (this.mode == "card") {
            parentElement.classList.add("silib-card-parent");
        } else if (this.mode == "page") {
            parentElement.classList.remove("silib-card-parent");
        }
    }
}