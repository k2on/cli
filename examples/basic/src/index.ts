import { run, router, command } from "@koons/cli";

const cli = router({
    add: router({
        module: command().fn(() => {
            console.log("Adding module");
        }),
    }),
    help: command().fn(() => console.log("Help command")),
    version: command().fn(() => console.log("Version 1.0")),
});

run(cli);
