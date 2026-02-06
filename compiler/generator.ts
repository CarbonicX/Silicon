import fs from "fs";
import path from "path"

export class Generator {
    static declaration: Map<string, string> = new Map();

    static generateDeclarations(root: any) {
        for (const node of root) {
            let name = node.name;
            let parameters = "";
            if (node.parameters.length > 0) {
                parameters = ", " + node.parameters.join(": any, ") + ": any";
            }

            let constructorCode = ""
            for (const n of node.list.elements) {
               constructorCode += `\t\tthis.addChild(${this.generateCode(n)});\n`;
            }

            let code = `
import * as silicon from "../silicon.index.js";
export class ${name} extends silicon.ComplexWidgetBase {
    protected _element: HTMLElement;
    constructor(id: string | null, classes: string[]${parameters}) {
        super(id, classes);
        this._element = document.createElement("div");

${constructorCode}
        this.setIdAndClasses();
    }
}
`
            this.declaration.set(node.name, code);
        }
    }

    static generateCode(node: any): any {
        if (node.type == "Literal" || node.type == "Code") {
            return node.value;
        }
        if (node.type == "Variable") {
            return node.name;
        }
        if (node.type == "List") {
            let list = []
            for (const n of node.elements) {
                list.push(this.generateCode(n));
            }
            return `[${list.join(", ")}]`;
        }
        if (node.type == "WidgetUse") {
            let name = `silicon.${node.name}`;

            let paramList = [];
            for (const n of node.parameters) {
                paramList.push(this.generateCode(n));
            }
            let parameters = paramList.join(", ");
            if (parameters.length > 0) {
                parameters = ", " + parameters;
            }

            let id = "null";
            if (node.id != null) {
                id = `"${node.id}"`;
            }

            let classes = "[]";
            if (node.classes.length > 0) {
                let classList = [];
                for (const c of node.classes) {
                    classList.push(`"${c}"`)
                }
                classes = `[${classList.join(", ")}]`;
            }

            return `new ${name}(${id}, ${classes}${parameters})`
        }
    }

    static generateFiles(rootdir: string) {
        if (!fs.existsSync(path.join(rootdir, "generated"))) {
            fs.mkdirSync(path.join(rootdir, "generated"));
        }
        for (const k of this.declaration.keys()) {
            const filename = path.join(rootdir, `/generated/${k.toLowerCase()}.ts`)
            fs.writeFileSync(filename, this.declaration.get(k)!);
        }
    }

    static generateIndexTemplate(rootdir: string, libdir: string) {
        const indexFilePath = path.join(rootdir, "silicon.index.ts");
        const indexLines: string[] = fs.readFileSync(indexFilePath, "utf-8").split("\n");
        const modified: string[] = [];
        const lines: string[] = [];
        for (const l of indexLines) {
            const tokens = l.split(" ");
            for (let i = 0; i < tokens.length; i++) {
                if (tokens[i] == "as") {
                    modified.push(tokens[i + 1]!);
                    lines.push(l);
                    break;
                }
            }
        }

        let code = "";
        const files: string[] = getAllFiles(libdir);
        for (const f of files) {
            if (f.endsWith(".ts")) {
                const filename = f.slice(0, -3) + ".js";
                const filepath = path.relative(rootdir, filename);
                code += `export * from "./${filepath}";\n`;
            }
        }
        code = code.replaceAll("\\", "/");

        code += "\n";
        for (const k of this.declaration.keys()) {
            if (modified.includes(k)) continue;
            code += `export { ${k} } from "./generated/${k.toLowerCase()}.js";\n`;
        }

        code += "\n";
        code += lines.join("\n");
        code += "\n";

        fs.writeFileSync(path.join(rootdir, "silicon.index.ts"), code);
    }
}

export function getAllFiles(dir: string) {
    const files: string[] = []
    function traverse(p: string) {
        const items = fs.readdirSync(p);
        for (const i of items) {
            const filepath = path.join(p, i);
            const stat = fs.statSync(filepath);
            if (stat.isDirectory()) {
                traverse(filepath);
            } else {
                files.push(filepath);
            }
        }
    }
    traverse(dir);
    return files;
}
