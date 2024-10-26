import { run, router, command } from "@koons/cli";
import z from "zod";

const cli = router({
    add: router({
        module: command()
            .input(z.object({ name: z.number() }))
            .fn(({ name }) => {
                console.log(`Name: ${name}`);
            }),
        package: command()
            .input(
                z.object({
                    name: z.string(),
                }),
            )
            .fn(({ name }) => {
                console.log(`Package name: ${name}`);
            }),
    }),
    help: command().fn(() => console.log("Help command")),
    version: command().fn(() => console.log("Version 1.0")),
});

run(cli);
