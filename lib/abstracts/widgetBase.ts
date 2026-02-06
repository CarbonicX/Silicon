import { push } from "../utils.js";

interface ForAll<T> {
    (element: WidgetBase): T | undefined;
}

export abstract class WidgetBase {
    functions: string[] = [];
    protected inherentClass: string | null = null;

    protected abstract _element: HTMLElement;
    get element(): HTMLElement {
        return this._element;
    }
    id: string | null;
    classes: string[];

    constructor(id: string | null, classes: string[]) {
        this.id = id;
        this.classes = classes;
    }

    protected setIdAndClasses() {
        if (this.id != null) {
            this._element.id = this.id;
        }
        if (this.inherentClass != null) {
            this._element.classList.add(this.inherentClass);
        }
        if (this.classes.length > 0) {
            for (const c of this.classes) {
                this._element.classList.add(c);
            }
        }
    }

    addClassForElement(classname: string) {
        this._element.classList.add(classname);
    }

    removeClassForElement(classname: string) {
        this._element.classList.remove(classname);
    }

    hasClassForElement(classname: string): boolean {
        return this._element.classList.contains(classname);
    }
}

export abstract class ComplexWidgetBase extends WidgetBase {
    children: WidgetBase[] = [];

    addChild(child: WidgetBase) {
        this.children.push(child);
        this._element.appendChild(child.element);
    }

    each<T>(func: ForAll<T>): T[] {
        let result: T[] = [];
        for (const c of this.children) {
            push(result, func(c));
        };
        return result;
    }

    allEach<T>(func: ForAll<T>): T[] {
        let result: T[] = [];
        this.each((widget) => {
            push(result, func(widget))
            if (widget instanceof ComplexWidgetBase) {
                let list = widget.allEach(func);
                result.concat(list);
            }
        })
        return result;
    }
    
    findId(id: string): WidgetBase | undefined {
        for (const c of this.children) {
            if (c.id == id) return c;
            if (c instanceof ComplexWidgetBase) {
                let result = c.findId(id);
                if (result != undefined) return result;
            }
        }
    }

    forClass<T>(classname: string, func: ForAll<T>): T[] {
        return this.each((widget) => {
            if (widget.classes.includes(classname)) return func(widget);
        });
    }

    forAllClasses<T>(classname: string, func: ForAll<T>): T[] {
        /* 合并至 allEach
        this.each((widget) => {
            if (widget.classes.includes(classname)) {
                push(result, func(widget));
            }
            if (widget instanceof ComplexWidgetBase) {
                let list = widget.forAllClasses(classname, func);
                result.concat(list);
            }
        });
        */
        return this.allEach((widget) => {
            if (widget.classes.includes(classname)) return func(widget);
        })
    }
}