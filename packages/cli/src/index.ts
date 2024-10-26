export type Command = () => void;

export interface CLI {
    [key: string]: CLI | Command;
}

function commands(input: CLI) {
    console.log("Commands:");
    console.log(Object.keys(input).join("\n"));
}

function next(input: CLI, current: string | undefined, args: string[]) {
    if (!current) return commands(input);

    const handler = input[current];
    if (!handler) {
        console.log(`Command ${current} not found`);
        return;
    }

    if (typeof handler === "function") {
        handler();
        return;
    } else {
        const nextArg = args[1];
        const remainingArgs = args.slice(1);
        next(handler, nextArg, remainingArgs);
    }
}

export function run(input: CLI) {
    const args = process.argv.slice(2);
    const current = args[0];
    const commands = input;

    next(commands, current, args);
}

export const router = (input: CLI) => {
    return input;
};
