import { SlashCommands } from "../../interfaces/slashCommands";
import { slashCommandTypes } from "../../globals";

export const slashCommand: SlashCommands = {
    // Note aliases are optional
    description: "Interact with the roles of a server",
    guildOnly: true,
    name: "roles",
    options: [
        {
            choices: [
                {
                    name: "add",
                    value: "add"
                },
                {
                    name: "remove",
                    value: "remove"
                },
                {
                    name: "info",
                    value: "info"
                },
                {
                    name: "list",
                    value: "list"
                }
            ],
            description: "What will I be saying",
            name: "sub-command",
            required: true,
            type: slashCommandTypes.string
        }
    ],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    run: async (client, interaction) => {

        return interaction.reply({ content: interaction.options.data[0].value?.toLocaleString() } );
    }
};
