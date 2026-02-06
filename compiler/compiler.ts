import fs from "fs";
import path from "path";
import { Generator, getAllFiles } from "./generator.js";
import { generateAST } from "./ast.js";
import { parse } from "./cst.js";

main();

function main() {
    const version = "1.0.0";
    
    const args = process.argv;
    let userArgs;
    if (args[0]!.endsWith("node.exe") || args[0]!.endsWith("node")) {
        userArgs = args.slice(2);
    } else {
        userArgs = args.slice(1);
    }

    if (userArgs[0] == "-h" || userArgs[0] == "--help") {
        console.log(`Silicon Compiler version ${version}`);
        console.log("Usage: ");
        console.log("\t[sourcedir] [libdir]");
        console.log("By default: ");
        console.log("\t./silicon ./silicon-lib");
        return;
    } else if (userArgs[0] == "-v" || userArgs[0] == "--version") {
        console.log(`Silicon Compiler version ${version}`);
        return;
    }

    let sourcedir: string, libdir: string;
    if (userArgs.length == 0) {
        sourcedir = "./silicon";
        libdir = "./silicon-lib";
    } else if (userArgs.length == 2) {
        sourcedir = userArgs[0]!;
        libdir = userArgs[1]!;
    } else {
        console.log("Arguments error. Use -h / --help to see help.");
        return;
    }

    const files = getAllFiles(sourcedir);
    for (const f of files) {
        const sourceCode = fs.readFileSync(f, "utf-8");
        const cst = parse(sourceCode);
        const ast = generateAST(cst);
        Generator.generateDeclarations(ast);
    }
    const rootdir = path.dirname(sourcedir);
    Generator.generateFiles(rootdir);
    Generator.generateIndexTemplate(rootdir, libdir);
}
