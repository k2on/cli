export type Command = {
    _type: "command";
    fn: () => void;
};

export type Commands = {
    _type: "cli";
    commands: Record<string, CLI>;
};

export type CLI = Command | Commands;

function commands(input: CLI) {
    if (input._type == "cli") {
        console.log("Commands:");
        console.log(Object.keys(input.commands).join("\n"));
    } else {
        console.log("Command:", input);
    }
}

function next(input: CLI, current: string | undefined, args: string[]) {
    if (!current) return commands(input);

    if (input._type == "cli") {
        const handler = input.commands[current];
        if (!handler) {
            console.log(`Command ${current} not found`);
            return;
        }

        if (handler._type == "command") {
            handler.fn();
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

export const command = () => {
    return {
        fn: (functionInput: () => void): Command => {
            return {
                _type: "command",
                fn: functionInput,
            };
        },
    };
};
