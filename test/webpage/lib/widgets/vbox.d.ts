import { WidgetBase } from "../abstracts/widgetBase.js";
import { StretchContainer } from "../abstracts/stretchContainer.js";
export declare class VBox extends StretchContainer {
    protected inherentClass: string | null;
    protected _stretch: boolean;
    get stretch(): boolean;
    set stretch(stretch: boolean);
    constructor(id: string | null, classes: string[], children: WidgetBase[], stretch?: boolean);
    protected updateStretchingMode(stretch: boolean): void;
}
//# sourceMappingURL=vbox.d.ts.map