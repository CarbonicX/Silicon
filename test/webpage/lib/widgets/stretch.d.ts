import { WidgetBase } from "../abstracts/widgetBase.js";
export declare class Stretch extends WidgetBase {
    protected _element: HTMLDivElement;
    private _proportion;
    get proportion(): number;
    set proportion(proportion: number);
    constructor(id: string | null, classes: string[], proportion: number);
}
//# sourceMappingURL=stretch.d.ts.map