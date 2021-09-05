/* eslint-disable @typescript-eslint/member-ordering */
import { CONFIG, STORAGE } from "../globals";
import { Event } from "../interfaces/index";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

export const event: Event = {
    name: "ready",
    run: async (client) => {
        console.log(`${client.user?.tag} is online!`);
        console.log(STORAGE);

        if (!client.application?.owner) await client.application?.fetch();


        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const commands = client.slashCommands.map(({ run, devOnly, guildOnly, dmOnly, ...data }) => data);


        try {
            await client.application?.commands.set(commands);

        } catch (error) {
            console.log(`There was an error registering a slash command \n${error}`);
        }
        console.log(commands);

        const rest = new REST({ version: "9" }).setToken(CONFIG.token);
        const clientID = client.application?.id;
        if (clientID === undefined) {
            throw new Error("There was an error getting the client ID");
        }


        await (async (): Promise<void> => {
            try {
                console.log("Started refreshing application (/) commands");

                if (CONFIG.devEnv.isDev) {
                    await rest.put(
                        Routes.applicationGuildCommands(clientID, CONFIG.devEnv.devServer),
                        { body: commands }
                    );
                    console.log("Refreshing Commands in Development");

                } else {
                    await rest.put(
                        Routes.applicationCommands(clientID),
                        { body: commands }
                    );
                    console.log("Refreshing Commands in Production, This can take a while (Possibly up to an hour or longer)");

                }


                console.log("Sucessfully reloaded application (/) commands.");
            } catch (error) {
                console.error(error);
            }
        })();

    }
};