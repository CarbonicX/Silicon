import { WidgetBase } from "../abstracts/widgetBase.js";

export class Stretch extends WidgetBase {
    protected _element: HTMLDivElement;

    private _proportion!: number;
    get proportion(): number {
        return this._proportion;
    }
    set proportion(proportion: number) {
        this._proportion = proportion;
        this._element.style.cssText = "flex-grow: " + proportion;
    }

    constructor(id: string | null, classes: string[], proportion: number) {
        super(id, classes);

        this._element = document.createElement("div");
        this.proportion = proportion;

        this.setIdAndClasses();
    }
}