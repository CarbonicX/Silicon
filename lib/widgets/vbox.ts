import { HBox } from "./hbox.js";
import { WidgetBase } from "../abstracts/widgetBase.js";
import { StretchContainer } from "../abstracts/stretchContainer.js";

export class VBox extends StretchContainer {
    protected inherentClass: string | null = "silib-vbox";

    protected _stretch!: boolean;
    get stretch(): boolean {
        return this._stretch;
    }
    set stretch(stretch: boolean) {
        this._stretch = stretch;
        this.updateStretchingMode();
    }

    private _center!: boolean;
    get center(): boolean {
        return this._center;
    }
    set center(center: boolean) {
        this._center = center;
        this.updateStretchingMode();
    }

    constructor(id: string | null, classes: string[], children: WidgetBase[], 
        stretch: boolean = true, center: boolean = false) {
        super(id, classes, children);

        this._stretch = stretch;
        this._center = center;
        this.updateStretchingMode();

        this.each((widget) => {
            if (widget.functions.includes("stretchable")) {
                widget.addClassForElement("silib-stretching");
            }
        });

        this.setIdAndClasses();
    }

    protected updateStretchingMode(): void {
        if (this.stretch) this.addClassForElement("silib-vbox-stretch");
        else this.removeClassForElement("silib-vbox-stretch");

        let hasHBox = false;
        for (const c of this.children) {
            if (c instanceof HBox && c.stretch) {
                hasHBox = true;
            }
        }
        if (!hasHBox && this.center) {
            this.addClassForElement("silib-vbox-center");
        } else {
            this.removeClassForElement("silib-vbox-center");
        }
    }
    
}
