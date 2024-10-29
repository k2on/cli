# Koons CLI

Simple typesafe CLI framework.

```ts
import { run, router, command } from "@koons/cli";
import z from "zod";

const cli = router({
    add: router({
        module: command()
            .describe("Add a module")
            .input(z.object({ name: z.number() }))
            .fn(({ input }) => {
                console.log(`Adding module: "${input.name}"`);
            }),
    }),
    version: command()
        .describe("Show the CLI version")
        .fn(() => console.log("Version 1.0")),
});

run(cli);
```

Will allow you to run:

```sh
my-cli add module acme-core # "Adding module: "acme-core""
my-cli version # "Version 1.0"
```

## Installation

### Genesis

```sh
genesis add cli
```

### npm

```sh
yarn add @koons/cli
```
