import { ColorResolvable, Message, MessageActionRow, MessageButton, MessageEmbed } from "discord.js";
import { capitalize, commandPaginate } from "../utils/utils";
import { Event } from "../interfaces/event";

export const event: Event = {
    name: "interactionCreate",
    run: async (client, interaction) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!interaction.isButton()) return;
        const msg = interaction.message as Message;
        const { component } = interaction;

        if (component === null) return;

        const { label } = new MessageButton(component);


        switch (interaction.customId) {
            case "HelpBackPage": {
                const commands = commandPaginate(client.commands.array(), 4, Number(label));
                const colour = msg.guild?.me?.displayColor as ColorResolvable;

                const embed = new MessageEmbed()
                    .setTitle(`${client.user?.tag}'s Commands`)
                    .setTimestamp()
                    .setColor(colour)
                    .setFooter(`Page ${label}`);
                if (commands.length === 0) {
                    embed.addField("Empty", "> This page is emtpy!");
                } else {
                    commands.forEach((cmd) => {

                        let aliases = "";

                        if (cmd.aliases !== undefined) aliases = `> **Aliases:** ${cmd.aliases.map((a) => `\`${a}\``)}`;

                        embed.addField(capitalize(cmd.name), `${`> **Description:** ${cmd.descirption} \n`
                            + `> **Group:** ${capitalize(cmd.group)}\n`
                            + `> **Example usage:** ${cmd.example.map((a) => `\`${a}\``).join(", ")}\n`}${aliases}`);

                    });
                }

                const left = new MessageButton()
                    .setCustomId("HelpBackPage")
                    .setEmoji("⬅️")
                    .setLabel((Number(label) - 1).toString())
                    .setStyle("PRIMARY");
                if (Number(label) - 1 === 0) left.setDisabled(true);

                const right = new MessageButton()
                    .setCustomId("HelpForwardPage")
                    .setEmoji("➡️")
                    .setLabel((Number(label) + 1).toString())
                    .setStyle("PRIMARY");
                const deleteButton = new MessageButton()
                    .setCustomId("delete")
                    .setLabel("❌")
                    .setStyle("DANGER");

                if (commands.length === 0) {
                    right.setDisabled(true);
                }

                const button = new MessageActionRow()
                    .addComponents(
                        left, right, deleteButton
                    );

                await interaction.update({ components: [button], embeds: [embed] });
                break;
            }
            case "HelpForwardPage": {
                const commands = commandPaginate(client.commands.array(), 4, Number(label));
                const colour = msg.guild?.me?.displayColor as ColorResolvable;

                const embed = new MessageEmbed()
                    .setTitle(`${client.user?.tag}'s Commands`)
                    .setTimestamp()
                    .setColor(colour)
                    .setFooter(`Page ${label}`);
                if (commands.length === 0) {
                    embed.addField("Empty", "> This page is emtpy!");
                } else {
                    commands.forEach((cmd) => {

                        let aliases = "";

                        if (cmd.aliases !== undefined) aliases = `> **Aliases:** ${cmd.aliases.map((a) => `\`${a}\``)}`;

                        embed.addField(capitalize(cmd.name), `${`> **Description:** ${cmd.descirption} \n`
                            + `> **Group:** ${capitalize(cmd.group)}\n`
                            + `> **Example usage:** ${cmd.example.map((a) => `\`${a}\``).join(", ")}\n`}${aliases}`);

                    });
                }

                const left = new MessageButton()
                    .setCustomId("HelpBackPage")
                    .setEmoji("⬅️")
                    .setLabel((Number(label) - 1).toString())
                    .setStyle("PRIMARY");

                if (Number(label) - 1 === 0) left.setDisabled(true);


                const right = new MessageButton()
                    .setCustomId("HelpForwardPage")
                    .setEmoji("➡️")
                    .setLabel((Number(label) + 1).toString())
                    .setStyle("PRIMARY");

                const deleteButton = new MessageButton()
                    .setCustomId("delete")
                    .setLabel("❌")
                    .setStyle("DANGER");

                if (commands.length === 0) {
                    right.setDisabled(true);
                }

                const button = new MessageActionRow()
                    .addComponents(
                        left, right, deleteButton
                    );
                await interaction.update({ components: [button], embeds: [embed] });
                break;

            }


            case "delete": {
                await msg.delete();

            }
        }


    }
};