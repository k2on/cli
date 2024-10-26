import { z, ZodNever, ZodSchema, ZodTypeAny } from "zod";
import { commands } from "./util";

class CommandBuilder<T extends ZodSchema> {
    private schema: ZodSchema | undefined;
    private description: string | undefined;

    constructor(builder?: CommandBuilder<T>) {
        if (builder) {
            this.schema = builder.schema;
            this.description = builder.description;
        }
    }

    describe(description: string) {
        this.description = description;
        return this;
    }

    input<I extends ZodTypeAny>(schema: I) {
        this.schema = schema;

        return new CommandBuilder<z.infer<typeof schema>>(this);
    }

    fn(fn: (input: { input: T }) => void): BuildCommand<any> {
        return {
            _type: "command",
            input: this.schema,
            description: this.description,
            fn,
        };
    }
}

export function command() {
    return new CommandBuilder();
}

interface BuildCommand<T extends ZodTypeAny> {
    _type: "command";
    input?: ZodSchema<T>;
    description?: string;
    fn: (input: { input: T }) => void;
}

export type Commands = {
    _type: "cli";
    commands: Record<string, CLI>;
};

export type CLI = BuildCommand<any> | Commands;

function next(input: CLI, current: string | undefined, args: string[]) {
    if (!current) return commands(input);

    if (input._type == "cli") {
        const handler = input.commands[current];
        if (!handler) {
            console.log(`Command ${current} not found`);
            return;
        }

        if (handler._type == "command") {
            // @ts-ignore
            const shape = handler.input?.shape;
            const keys = Object.keys(shape);

            const remainingArgs = args.slice(1);

            const obj = keys.reduce(
                (acc, key, index) => {
                    // @ts-ignore
                    acc[key] = remainingArgs[index];
                    return acc;
                },
                {} as Record<string, unknown>,
            );

            handler.fn({ input: obj });
            return;
        } else {
            const nextArg = args[1];
            const remainingArgs = args.slice(1);
            next(handler, nextArg, remainingArgs);
        }
    } else {
        console.log("Command idk how we get here:", input);
    }
}

export function run(input: CLI) {
    const args = process.argv.slice(2);
    const current = args[0];
    const commands = input;

    next(commands, current, args);
}

export const router = (commands: Commands["commands"]): Commands => {
    return {
        _type: "cli",
        commands,
    };
};
