import { CONFIG } from "../globals";
import { Event } from "../interfaces/event";
import { Message } from "discord.js";

export const event: Event = {
    name: "messageCreate",
    run: (client, msg: Message) => {
        if (msg.author.bot || !msg.guild || !msg.content.startsWith(CONFIG.prefix)) return;

        const args = msg.content
            .slice(CONFIG.prefix.length)
            .trim()
            .split(/ +/g);

        const cmd = args.shift()?.toLowerCase();

        if (cmd === undefined) return;
        const command = client.commands.get(cmd) ?? client.aliases.get(cmd);
        if (command) {
            // Heres an example if you want a group called "managment" only be usable by admins:

            let shouldrun = true;
            let reason = "error";

            if (command.group === "managment") {
                if (msg.member?.permissions.has("ADMINISTRATOR") === false) {
                    shouldrun = false;
                    reason = "You must be an admin to run this command!";
                }
            }

            if (command.devonly === true) {
                if (CONFIG.owners.some((d) => d === msg.author.id)) {
                    shouldrun = false;
                    reason = "You must be a deveoper to run this command!";
                }
            }

            if (!shouldrun) return msg.reply(reason);

            command.run(client, msg, args);
        }

    }
};