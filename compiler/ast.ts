import type { CstNode } from "chevrotain";
import {
    parser
} from "./cst.js"

class Visitor extends parser.getBaseCstVisitorConstructor() {
    constructor() {
        super();
        this.validateVisitor();
    }

    expression(ctx: any) {
        if (ctx.Number) {
            return {type: "Literal", value: ctx.Number[0].image};
        }
        if (ctx.String) {
            return {type: "Literal", value: ctx.String[0].image};
        }
        if (ctx.CodeString) {
            return {type: "Code", value: ctx.CodeString[0].image.slice(2, -1)};
        }
        if (ctx.widgetUse) {
            return this.visit(ctx.widgetUse[0]);
        }
        if (ctx.list) {
            return this.visit(ctx.list[0]);
        }
        if (ctx.Identifier) {
            return {type: "Variable", name: ctx.Identifier[0].image}
        }
    }

    widgetUse(ctx: any) {
        const parameters = [];
        if (ctx.expression) {
            for (const e of ctx.expression) {
                parameters.push(this.visit(e));
            }
        }
        let id;
        let classes = []
        if (ctx.widgetId) {
            id = this.visit(ctx.widgetId);
        } else {
            id = null;
        }
        if (ctx.widgetClasses) {
            classes = this.visit(ctx.widgetClasses);
        }
        return {
            type: "WidgetUse", 
            name: ctx.Identifier[0].image,
            parameters: parameters, 
            id: id,
            classes: classes
        };
    }

    widgetId(ctx: any) {
        return ctx.Identifier[0].image;
    }

    widgetClasses(ctx: any) {
        const classes = [];
        for (const i of ctx.Identifier) {
            classes.push(i.image);
        }
        return classes;
    }

    widgetDeclaration(ctx: any) {
        const parameters = [];
        for (const i of ctx.Identifier.slice(1)) {
            parameters.push(i.image);
        }
        return {
            type: "WidgetDeclaration",
            name: ctx.Identifier[0].image,
            parameters: parameters,
            list: this.visit(ctx.list)
        }
    }

    declarations(ctx: any) {
        const elements = []
        if (ctx.widgetDeclaration) {
            for (const d of ctx.widgetDeclaration) {
                elements.push(this.visit(d));
            }
        }
        return elements;
    }

    list(ctx: any) {
        const elements = []
        if (ctx.expression) {
            for (const e of ctx.expression) {
                elements.push(this.visit(e));
            }
        }
        return {type: "List", elements: elements};
    }
}

export function generateAST(cst: CstNode) {
    const visitor = new Visitor();
    const ast = visitor.visit(cst);
    return ast;
}