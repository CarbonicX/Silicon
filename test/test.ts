import { generateAST } from "../dist/compiler/ast.js";
import { parse } from "../dist/compiler/cst.js";
import { Generator } from "../dist/compiler/generator.js";
import fs from "fs";

const text = fs.readFileSync("test/goal.si", "utf-8");
const cst = parse(text);
//const result = JSON.stringify(cst, null, 2);
const ast = generateAST(cst);

Generator.generateDeclarations(ast);


//fs.writeFileSync("test/goal.sio", JSON.stringify(ast, null, 2));

let out = "";
for (const k of Generator.declaration.keys()) {
    out += `==================== ${k} ====================\n`
    out += Generator.declaration.get(k);
    out += "\n\n\n";
}

out += "==================== silicon.index.ts ====================\n"
out += Generator.generateIndexTemplate("./lib/")

fs.writeFileSync("test/goal.sig", out);
