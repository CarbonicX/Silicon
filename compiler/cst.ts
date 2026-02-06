import {
    createToken, Lexer, CstParser
} from "chevrotain"

const WhiteSpace = createToken({
    name: "WhiteSpace",
    pattern: /\s+/,
    group: Lexer.SKIPPED
});

const Comment = createToken({
    name: "Comment",
    pattern: /\/\/.*/,
    group: Lexer.SKIPPED
});

const Number = createToken({
    name: "Number",
    pattern: /[0-9]+/
});

const String = createToken({
    name: "String",
    pattern: /(["'])(?:\\.|(?!\1)[^\\])*?\1/
});

const CodeString = createToken({
    name: "CodeString",
    pattern: /\$(["'])(?:\\.|(?!\1)[^\\])*?\1/
});

const Identifier = createToken({
    name: "Identifier",
    pattern: /[a-zA-Z_]+\w*/
})

const WidgetKeyWord = createToken({name: "WidgetKeyWord", pattern: /widget/})

const LCurlyBrace = createToken({name: "LCurlyBrace", pattern: /\{/})
const RCurlyBrace = createToken({name: "RCurlyBrace", pattern: /\}/})

const LBracket = createToken({name: "LBracket", pattern: /\(/})
const RBracket = createToken({name: "RBracket", pattern: /\)/})

const Colon = createToken({name: "Colon", pattern: /:/})
const Semicolon = createToken({name: "Semicolon", pattern: /;/})
const Comma = createToken({name: "Comma", pattern: /,/})
const Equal = createToken({name: "Equal", pattern: /=/})

const allTokens = [WhiteSpace, Comment, Number, CodeString, String, 
    WidgetKeyWord,
    LBracket, RBracket, LCurlyBrace, RCurlyBrace, Colon, Semicolon, Comma, Equal, Identifier
];

class Parser extends CstParser {
    constructor() {
        super(allTokens);
        this.performSelfAnalysis();
    }

    public declarations = this.RULE("declarations", () => {
        this.MANY(() => {
            this.SUBRULE(this.widgetDeclaration);
        });
    });

    private widgetDeclaration = this.RULE("widgetDeclaration", () => {
        this.CONSUME(WidgetKeyWord);
        this.CONSUME(Identifier);
        this.CONSUME(LBracket);
        this.OPTION(() => {
            this.CONSUME2(Identifier);
            this.MANY(() => {
                this.CONSUME(Comma);
                this.CONSUME3(Identifier);
            });
        });
        this.CONSUME(RBracket);
        this.SUBRULE(this.list);
    })

    private list = this.RULE("list", () => {
        this.CONSUME(LCurlyBrace);
        this.OPTION(() => {
            this.SUBRULE(this.expression);
            this.MANY(() => {
                this.CONSUME(Comma);
                this.SUBRULE2(this.expression);
            });
        });
        this.CONSUME(RCurlyBrace);
    })

    private widgetUse = this.RULE("widgetUse", () => {
        this.OPTION(() => this.SUBRULE(this.widgetId));
        this.CONSUME(Identifier);
        this.CONSUME(LBracket);
        this.OPTION2(() => {
            this.SUBRULE(this.expression);
            this.MANY(() => {
                this.CONSUME(Comma);
                this.SUBRULE2(this.expression);
            });
        });
        this.CONSUME(RBracket);
        this.OPTION3(() => this.SUBRULE(this.widgetClasses));
    });

    private widgetId = this.RULE("widgetId", () => {
        this.CONSUME(Identifier);
        this.CONSUME(Equal);
    })

    private widgetClasses = this.RULE("widgetClasses", () => {
        this.CONSUME(Colon);
        this.CONSUME(Identifier);
        this.MANY(() => {
            this.CONSUME(Semicolon);
            this.CONSUME2(Identifier);
        })
    })

    private expression = this.RULE("expression", () => {
        this.OR([
            {ALT: () => this.CONSUME(Number)},
            {ALT: () => this.CONSUME(String)},
            {ALT: () => this.CONSUME(CodeString)},
            {ALT: () => this.SUBRULE(this.widgetUse)},
            {ALT: () => this.SUBRULE(this.list)},
            {ALT: () => this.CONSUME(Identifier)}
        ]);
    });
}

const lexer = new Lexer(allTokens);
export const parser = new Parser();

export function parse(text: string) {
    const lexResult = lexer.tokenize(text);
    if (lexResult.errors.length > 0) throw new Error(lexResult.errors.toString());

    parser.input = lexResult.tokens;
    const cst = parser.declarations();
    if(parser.errors.length > 0) throw new Error(parser.errors.toString());
    return cst;
}