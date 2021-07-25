import { Event } from "../interfaces";

export const event: Event = {
    name: "interactionCreate",
    run: async (client, interaction) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!interaction.isButton()) return;

        const button = client.interactions.get(interaction.customId);
        if (button) {

            button.run(client, interaction);
        }

    }
};