import { WidgetBase } from "../abstracts/widgetBase.js";
export declare class InputBox extends WidgetBase {
    functions: string[];
    protected _element: HTMLInputElement;
    get value(): string;
    set value(value: string);
    constructor(id: string | null, classes: string[]);
}
//# sourceMappingURL=inputBox.d.ts.map