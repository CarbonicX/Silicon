import { WidgetBase } from "../abstracts/widgetBase.js";
import { StretchContainer } from "../abstracts/stretchContainer.js";
export declare class HBox extends StretchContainer {
    protected inherentClass: string | null;
    protected hasStretch: boolean;
    protected _stretch: boolean;
    get stretch(): boolean;
    set stretch(stretch: boolean);
    constructor(id: string | null, classes: string[], children: WidgetBase[], stretch?: boolean);
    private updateStretch;
    protected updateStretchingMode(stretch: boolean): void;
    addChild(child: WidgetBase): void;
    removeChild(child: WidgetBase): void;
}
//# sourceMappingURL=hbox.d.ts.map