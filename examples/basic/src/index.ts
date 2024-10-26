import { run, router, command } from "@koons/cli";
import z from "zod";

const cli = router({
    add: router({
        module: command()
            .describe("Add a module")
            .input(z.object({ name: z.number() }))
            .fn(({ name }) => {
                console.log(`Name: ${name}`);
            }),
        package: command()
            .describe("Add a package")
            .input(
                z.object({
                    name: z.string(),
                }),
            )
            .fn(({ name }) => {
                console.log(`Package name: ${name}`);
            }),
    }),
    help: command()
        .describe("Show help for the CLI")
        .fn(() => console.log("Help command")),
    version: command()
        .describe("Show the CLI version")
        .fn(() => console.log("Version 1.0")),
});

run(cli);
