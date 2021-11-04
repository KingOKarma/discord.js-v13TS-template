import { MessageActionRow, MessageSelectMenu } from "discord.js";
import { SlashCommands } from "../../../interfaces/slashCommands";

export const slashCommand: SlashCommands = {
    // Note aliases are optional
    description: "Rate Your experience with the bot!",
    name: "rate",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    run: async (client, intr) => {

        const row = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                    .setCustomId("test")
                    .setPlaceholder("Nothing Selected")
                    .addOptions([
                        {
                            description: "It's been amazing!",
                            emoji: "⭐",
                            label: "Amazing!",
                            value: "amazing"
                        },
                        {
                            description: "It's been Ok!",
                            emoji: "👍",
                            label: "Ok!",
                            value: "ok"
                        }, {
                            description: "It's been Bad!",
                            emoji: "😔",
                            label: "Bad!",
                            value: "bad"
                        }, {
                            description: "It's been Horrible!",
                            emoji: "😡",
                            label: "Horrible!",
                            value: "horrible"
                        }
                    ])
            );

        return intr.reply({ components: [row], content: "Rate me!" } );
    }
};
