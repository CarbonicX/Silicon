import { WidgetBase } from "../abstracts/widgetBase.js";

export interface IPageStyle {
    backgroundColor?: string,
    foregroundColor?: string,
    maxHeight?: number,
    maxWidth?: number, 
    padding?: number
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
    style(parent: HTMLElement | WidgetBase, settings: IPageStyle) {
        if (parent instanceof WidgetBase) {
            parent = parent.element;
        }

        if (settings.backgroundColor != undefined)
            parent.style.backgroundColor = settings.backgroundColor;

        if (settings.foregroundColor != undefined)
            this._element.style.backgroundColor = settings.foregroundColor;

        if (settings.maxHeight != undefined)
            this._element.style.maxHeight = settings.maxHeight.toString() + "px";

        if (settings.maxWidth != undefined)
            this._element.style.maxWidth = settings.maxWidth.toString() + "px";

        if (settings.padding != undefined)
            this._element.style.padding = settings.padding.toString() + "px";

        if (this.mode == "card") {
            parent.classList.add("silib-card-parent");
        } else if (this.mode == "page") {
            parent.classList.remove("silib-card-parent");
        }
    }
}