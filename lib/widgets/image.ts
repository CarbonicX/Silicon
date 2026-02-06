import { WidgetBase } from "../abstracts/widgetBase.js";

export class Image extends WidgetBase {
    protected _element: HTMLImageElement;
    
    constructor(id: string | null, classes: string[], image: string, width?: number, height?: number) {
        super(id, classes);

        this._element = document.createElement("img");
        this._element.src = image;
        if (width != undefined) {
            this._element.width = width;
        }
        if (height != undefined) {
            this._element.height = height;
        }

        this.setIdAndClasses();
    }
}