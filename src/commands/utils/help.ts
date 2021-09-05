/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { ColorResolvable, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { Command } from "../../interfaces";
import { arrayPage } from "../../utils/arrayPage";
import { capitalize } from "../../utils/capitalize";
import { deleteButton } from "../../globals";

type HelpType = "page" | "cmd";

export const command: Command = {
    aliases: ["h"],
    description: "Get a list of all my commmands!",
    example: ["!help <page>", "!help <commandName>"],
    group: "utils",
    name: "help",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    run: async (client, msg, args) => {


        // eslint-disable-next-line prefer-destructuring
        let page = args[0];

        let pageOrCmd: HelpType = "page";

        if (!/^\+?(0|[1-9]\d*)$/.exec(args[0])) pageOrCmd = "cmd";


        if (args.length === 0) {
            pageOrCmd = "page";
            page = "1";
        }

        switch (pageOrCmd) {
            case "page": {

                const commands = arrayPage([...client.commands.values()], 4, Number(page));
                const colour = msg.guild?.me?.displayColor as ColorResolvable;

                let finalPage = 1;
                let notMax = false;
                while (!notMax) {
                    const cmds = arrayPage([...client.commands.values()], 4, finalPage);
                    if (cmds.length !== 0) {
                        finalPage++;
                    } else {
                        notMax = true;
                    }
                }
                finalPage -= 1;

                const embed = new MessageEmbed()
                    .setTitle(`${client.user?.tag}'s ${client.commands.size} Commands`)
                    .setTimestamp()
                    .setColor(colour)
                    .setFooter(`Page ${page} of ${finalPage} pages`);
                if (commands.length === 0) {
                    embed.addField("Empty", "> This page is emtpy!");
                } else {
                    commands.forEach((cmd) => {

                        let aliases = "";

                        if (cmd.aliases !== undefined) aliases = `> **Aliases:** ${cmd.aliases.map((a) => `\`${a}\``)}`;

                        embed.addField(capitalize(cmd.name), `${`> **Description:** ${cmd.description} \n`
                            + `> **Group:** ${capitalize(cmd.group)}\n`
                            + `> **Example usage:** ${cmd.example.map((a) => `\`${a}\``).join(", ")}\n`}${aliases}`);

                    });
                }


                const first = new MessageButton()
                    .setCustomId("helpfirstpage")
                    .setEmoji("⏮️")
                    .setLabel("1")
                    .setStyle("SECONDARY");

                const last = new MessageButton()
                    .setCustomId("helplastpage")
                    .setEmoji("⏭️")
                    .setLabel(`${finalPage}`)
                    .setStyle("SECONDARY");

                const left = new MessageButton()
                    .setCustomId("helpbackpage")
                    .setEmoji("◀️")
                    .setLabel((Number(page) - 1).toString())
                    .setStyle("PRIMARY");

                if (Number(page) - 1 === 0) left.setDisabled(true);


                const right = new MessageButton()
                    .setCustomId("helpforwardpage")
                    .setEmoji("▶️")
                    .setLabel((Number(page) + 1).toString())
                    .setStyle("PRIMARY");
                if (Number(page) === finalPage) right.setDisabled(true);


                if (commands.length === 0) {
                    right.setDisabled(true);
                }

                if (page === "0") {
                    left.setDisabled(true);
                    right.setDisabled(false);
                }

                const button = new MessageActionRow()
                    .addComponents(
                        first, left, right, last, deleteButton
                    );

                const otherButton = new MessageActionRow()
                    .addComponents(
                        deleteButton
                    );

                if (Number(page) > finalPage) {
                    return msg.reply({ components: [otherButton], embeds: [embed] }).then(() => {
                        if (msg.deletable) return msg.delete();
                    });
                }

                return msg.reply({ components: [button], embeds: [embed] }).then(() => {
                    if (msg.deletable) return msg.delete();
                });

            }

            case "cmd": {

                const colour = msg.guild?.me?.displayColor as ColorResolvable;


                const cmd = [...client.commands.values()].find((c) => {
                    if (c.aliases !== undefined) {
                        const alias = c.aliases.findIndex((a) => a === args[0]);

                        if (alias === -1) {
                            return c.name === args[0];
                        }

                        return c.aliases[alias];

                    }
                    return c.name === args[0];
                });

                // Const cmd = client.commands.get(args[0]);
                const embed = new MessageEmbed();

                if (cmd === undefined) {
                    embed.setTitle("Command not found");
                    embed.setTimestamp();
                    embed.setColor(colour);
                    return msg.reply({ embeds: [embed] }).then(() => {
                        if (msg.deletable) return msg.delete();
                    });

                }

                let aliases = "";

                if (cmd.aliases !== undefined) aliases = `\n> \n> **Aliases:** ${cmd.aliases.map((a) => `\`${a}\``)}`;

                embed.setTitle(`${capitalize(cmd.name)}'s Details`);
                embed.setTimestamp();
                embed.setColor(colour);
                embed.setDescription(
                    `> **Description:** ${cmd.description}\n> \n`
                    + `> **Group:** ${capitalize(cmd.group)}\n> \n`
                    + `> **Example Usage:** ${cmd.example.map((a) => `\`${a}\``).join(", ")}`
                    + `${aliases}`

                );

                const button = new MessageActionRow()
                    .addComponents(
                        deleteButton
                    );

                return msg.reply({ components: [button], embeds: [embed] }).then(() => {
                    if (msg.deletable) return msg.delete();
                });

            }
        }
    }
};
