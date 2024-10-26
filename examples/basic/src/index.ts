import { cli } from "@koons/cli";

cli({
    help: () => console.log("Help command"),
    version: () => console.log("Version 1.0"),
}).run();
