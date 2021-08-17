import { SlashCommands } from "../../interfaces/slashCommands";
import { slashCommandTypes } from "../../globals";

export const slashCommand: SlashCommands = {
    // Note aliases are optional
    defaultPermission: false,
    description: "Interact with the roles of a server",
    devOnly: true,
    name: "dev",
    options: [
        {
            choices: [
                {
                    name: "deploy",
                    value: "deploy"
                },
                {
                    name: "test",
                    value: "test"
                },
                {
                    name: "owo",
                    value: "owo"
                },
                {
                    name: "uwu",
                    value: "uwu"
                }
            ],
            description: "These commands are only usable by the devs",
            name: "sub-command",
            required: true,
            type: slashCommandTypes.string
        }
    ],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    run: async (client, interaction) => {

        console.log(interaction.options.getString("sub-command"));
        const cmd = interaction.options.getString("sub-command");


        return interaction.reply({ content: `${cmd} lol` } );
    }
};
