import { CLI } from ".";

function commandDetails(command: CLI) {
    if (command._type == "command") {
        if (!command.description) return "";
        return `${command.description}`;
    } else {
        return "Menu";
    }

}

export function commands(input: CLI) {
    if (input._type == "cli") {
        console.log("Command List:");
        console.log(Object.entries(input.commands).map(([key, value]) => `${key}: ${commandDetails(value)}`).join("\n"));
    } else {
        console.log("Command:", input);
    }
}
