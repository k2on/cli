import { run, router, command } from "@koons/cli";
import z from "zod";

const cli = router({
    add: router({
        module: command()
            .describe("Add a module")
            .input(z.object({ name: z.number() }))
            .fn(({ name }) => {
                console.log(`Adding module: "${name}`);
            }),
    }),
    version: command()
        .describe("Show the CLI version")
        .fn(() => console.log("Version 1.0")),
});

run(cli);
