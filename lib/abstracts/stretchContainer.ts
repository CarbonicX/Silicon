import { ComplexWidgetBase, WidgetBase } from "../abstracts/widgetBase.js";

export interface IStretchContainerStyle {
    gap: 20, 
    padding: number | undefined
}

export abstract class StretchContainer extends ComplexWidgetBase {
    protected _element: HTMLDivElement;
    protected abstract _stretch: boolean;
    abstract get stretch(): boolean;
    abstract set stretch(mode: boolean);
    
    // 重载时需要：
    // 设置 mode
    constructor(id: string | null, classes: string[], children: WidgetBase[]) {
        super(id, classes);

        this.children = children;

        this._element = document.createElement("div");

        this.each((widget) => {
            this._element.appendChild(widget.element);
        })
    }

    addChild(child: WidgetBase) {
        super.addChild(child);
    }

    removeChild(child: WidgetBase) {
        this.children = this.children.filter(c => c != child);
        this._element.removeChild(child.element);
    }

    removeChildById(id: string) {
        let child = this.findId(id);
        if (child == undefined) throw new Error("Cannot find id \"" + id + "\"");
        this.removeChild(child);
    }

    style(style: IStretchContainerStyle) {
        this._element.style.gap = style.gap.toString() + "px";
        if (style.padding != undefined)
            this._element.style.padding = style.padding.toString() + "px";
    }
}