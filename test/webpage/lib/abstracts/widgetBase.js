import { push } from "../utils.js";
export class WidgetBase {
    functions = [];
    inherentClass = null;
    get element() {
        return this._element;
    }
    id;
    classes;
    constructor(id, classes) {
        this.id = id;
        this.classes = classes;
    }
    setIdAndClasses() {
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
    addClassForElement(classname) {
        this._element.classList.add(classname);
    }
    removeClassForElement(classname) {
        this._element.classList.remove(classname);
    }
    hasClassForElement(classname) {
        return this._element.classList.contains(classname);
    }
}
export class ComplexWidgetBase extends WidgetBase {
    children = [];
    addChild(child) {
        this.children.push(child);
    }
    each(func) {
        let result = [];
        for (const c of this.children) {
            push(result, func(c));
        }
        ;
        return result;
    }
    allEach(func) {
        let result = [];
        this.each((widget) => {
            push(result, func(widget));
            if (widget instanceof ComplexWidgetBase) {
                let list = widget.allEach(func);
                result.concat(list);
            }
        });
        return result;
    }
    findId(id) {
        for (const c of this.children) {
            if (c.id == id)
                return c;
            if (c instanceof ComplexWidgetBase) {
                let result = c.findId(id);
                if (result != undefined)
                    return result;
            }
        }
    }
    forClass(classname, func) {
        return this.each((widget) => {
            if (widget.classes.includes(classname))
                return func(widget);
        });
    }
    forAllClasses(classname, func) {
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
            if (widget.classes.includes(classname))
                return func(widget);
        });
    }
}
//# sourceMappingURL=widgetBase.js.map