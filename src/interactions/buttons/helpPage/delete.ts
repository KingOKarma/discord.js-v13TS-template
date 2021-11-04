import Buttons from "../../../interfaces/buttons";
import { Message } from "discord.js";

export const buttons: Buttons = {
    name: "delete",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    run: async(client, interaction) => {
        const msg = interaction.message as Message;
        await msg.delete();

    }
};
