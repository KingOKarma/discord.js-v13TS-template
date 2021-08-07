import { Command } from "../../interfaces";

export const command: Command = {
    // Note aliases are optional
    aliases: ["p"],
    description: "Omega Test!",
    example: ["!ping"],
    group: "other",
    name: "ping",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    run: async(client, msg, _args) => {
        // Run your code here
        return msg.reply("owo");
    }
};