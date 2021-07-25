import Interactions from "../../interfaces/interactions";
import { Message } from "discord.js";

export const interations: Interactions = {
    name: "delete",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    run: async(client, interaction) => {
        const msg = interaction.message as Message;
        await msg.delete();

    }
};