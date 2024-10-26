import { run, router } from "@koons/cli";

const cli = router({
    add: router({
        module: () => console.log("Adding module"),
    }),
    help: () => console.log("Help command"),
    version: () => console.log("Version 1.0"),
});

run(cli);
