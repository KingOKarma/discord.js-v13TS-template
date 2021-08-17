import { CONFIG } from "../globals";
import { Event } from "../interfaces";
import { Interaction } from "discord.js";

export const event: Event = {
    name: "interactionCreate",
    run: async (client, interaction: Interaction) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (interaction.isButton()) {
            const button = client.buttons.get(interaction.customId);
            if (button) {
                button.run(client, interaction);
            }
        }

        if (interaction.isCommand()) {
            const slashCommand = client.slashCommands.get(interaction.commandName);
            if (slashCommand) {

                if (slashCommand.devOnly ?? false) {
                    if (!CONFIG.owners.includes(interaction.user.id)) {
                        return interaction.reply({ content: "This Command may only be used by the bot's developers!", ephemeral: true } );
                    }
                }

                if (slashCommand.guildOnly ?? false) {
                    if (!interaction.inGuild()) {
                        return interaction.reply({ content: "This Command can only be used inside of servers!", ephemeral: true } );
                    }
                }

                if (slashCommand.dmOnly ?? false) {
                    if (interaction.inGuild()) {
                        return interaction.reply({ content: "This Command can only be used inside of DMs!", ephemeral: true } );
                    }
                }

                slashCommand.run(client, interaction);
            }

        }
    }
};