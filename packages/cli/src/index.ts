export type CLIInput = Record<string, Function>;

const run = (input: CLIInput) => {
    const args = process.argv.slice(2);

    const command = args[0];

    if (!command) {
        console.log("Commands:");
        console.log(Object.keys(input).join("\n"));
        return;
    }

    const handler = input[command];
    if (!handler) {
        console.log("Command not found");
        return;
    }

    handler();
};

export const cli = (input: CLIInput) => {
    return {
        run: () => run(input),
    };
};
