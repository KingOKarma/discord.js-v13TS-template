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
                slashCommand.run(client, interaction);
            }

        }
    }
};