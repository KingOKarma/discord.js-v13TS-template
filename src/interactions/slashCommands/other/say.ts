import { SlashCommands } from "../../../interfaces/slashCommands";
import { slashCommandTypes } from "../../../globals";

export const slashCommand: SlashCommands = {
    // Note aliases are optional
    description: "Say anything!",
    name: "say",
    options: [
        {
            description: "What will I be saying",
            name: "saystring",
            required: true,
            type: slashCommandTypes.string
        }
    ],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    run: async (client, intr) => {

        const args = intr.options.getString("saystring");

        return intr.reply({ content: args } );
    }
};
