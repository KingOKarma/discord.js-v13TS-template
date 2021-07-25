/* eslint-disable @typescript-eslint/member-ordering */
import { Client, Collection } from "discord.js";
import { Command, Event } from "../interfaces/index";
import fs, { readdirSync } from "fs";
import { CONFIG } from "../globals";
import Interactions from "../interfaces/interactions";
import path from "path";

class ExtendedClient extends Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public aliases: Collection<string, Command> = new Collection();
    public interactions: Collection<string, Interactions> = new Collection();

    public async init(): Promise<void> {
        void this.login(CONFIG.token);


        /* Commands */
        const commandPath = path.join(__dirname, "..", "commands");
        console.log(commandPath);
        fs.readdirSync(commandPath).forEach((dir) => {
            const commands = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith(".js"));

            for (const file of commands) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const { command } = require(`${commandPath}/${dir}/${file}`);
                this.commands.set(command.name, command);

                if (command?.aliases !== undefined) {
                    command.aliases.forEach((alias: string) => {
                        this.aliases.set(alias, command);
                    });
                }
            }
        });

        /* Events */
        const eventPath = path.join(__dirname, "..", "events");
        fs.readdirSync(eventPath).forEach(async (file) => {
            const { event } = await import(`${eventPath}/${file}`);
            this.events.set(event.name, event);
            console.log(event);
            this.on(event.name, event.run.bind(null, this));
        });


        /* Interactions */
        const interactionPath = path.join(__dirname, "..", "interactions");
        console.log(interactionPath);
        fs.readdirSync(interactionPath).forEach((dir) => {
            const interactions = readdirSync(`${interactionPath}/${dir}`).filter((file) => file.endsWith(".js"));

            for (const file of interactions) {
                console.log(file);
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const { interations } = require(`${interactionPath}/${dir}/${file}`);
                this.interactions.set(interations.name, interations);

            }
        });


    }
}

export default ExtendedClient;
