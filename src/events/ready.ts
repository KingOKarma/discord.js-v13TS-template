/* eslint-disable @typescript-eslint/member-ordering */
import { CONFIG } from "../globals";
import { Event } from "../interfaces/index";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { getGuild } from "../utils/getGuild";


export const event: Event = {
    name: "ready",
    run: async (client) => {
        console.log(`${client.user?.tag} is online!\n`);

        if (!client.application?.owner) await client.application?.fetch();

        if (client.application === null) {
            throw new Error("Client Did not register in time, please try again");
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const commands = client.slashCommands.map(({ run, devOnly, guildOnly, dmOnly, ...data }) => data);

        try {
            if (CONFIG.devEnv.isDev) {
                const guild = await getGuild(CONFIG.devEnv.devServer, client);

                if (guild === null) {
                    return void console.log("Could not find Dev ServerID");
                }

                await guild.commands.set(commands);
                console.log("Set Commands for Dev Server\nCommands List:"
                + `\n ${(await guild.commands.fetch()).map((c) => c.name)}\n`);
            } else {
                await client.application.commands.set(commands);
                console.log("Set Commands for Production\nCommands List:"
                + `\n ${(await client.application.commands.fetch()).map((c) => c.name)}\n`);
            }

        } catch (error) {
            console.log(`There was an error registering a slash command \n${error}`);
        }

        const rest = new REST({ version: "9" }).setToken(CONFIG.token);
        const clientID = client.application.id;

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

                console.log("Sucessfully reloaded application (/) commands.\n");
            } catch (error) {
                console.error(error);
            }
        })();

    }
};
