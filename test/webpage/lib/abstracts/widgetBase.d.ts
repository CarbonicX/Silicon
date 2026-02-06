interface ForAll<T> {
    (element: WidgetBase): T | undefined;
}
export declare abstract class WidgetBase {
    functions: string[];
    protected inherentClass: string | null;
    protected abstract _element: HTMLElement;
    get element(): HTMLElement;
    id: string | null;
    classes: string[];
    constructor(id: string | null, classes: string[]);
    protected setIdAndClasses(): void;
    addClassForElement(classname: string): void;
    removeClassForElement(classname: string): void;
    hasClassForElement(classname: string): boolean;
}
export declare abstract class ComplexWidgetBase extends WidgetBase {
    children: WidgetBase[];
    addChild(child: WidgetBase): void;
    each<T>(func: ForAll<T>): T[];
    allEach<T>(func: ForAll<T>): T[];
    findId(id: string): WidgetBase | undefined;
    forClass<T>(classname: string, func: ForAll<T>): T[];
    forAllClasses<T>(classname: string, func: ForAll<T>): T[];
}
export {};
//# sourceMappingURL=widgetBase.d.ts.map