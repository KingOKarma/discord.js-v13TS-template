/* eslint-disable @typescript-eslint/member-ordering */
import { Client, Collection, CommandInteraction, Message } from "discord.js";
import { Command, Event } from "../interfaces/index";
import fs, { readdirSync } from "fs";
import Buttons from "../interfaces/buttons";
import { CONFIG } from "../globals";
import { Cooldowns } from "../interfaces/cooldown";
import SelectMenus from "../interfaces/selectMenus";
import { SlashCommands } from "../interfaces/slashCommands";
import path from "path";

class ExtendedClient extends Client {
    public commands: Collection<string, Command> = new Collection();
    public events: Collection<string, Event> = new Collection();
    public aliases: Collection<string, Command> = new Collection();
    public buttons: Collection<string, Buttons> = new Collection();
    public slashCommands: Collection<string, SlashCommands> = new Collection();
    public cooldowns: Collection<string, Cooldowns> = new Collection();
    public selectMenus: Collection<string, SelectMenus> = new Collection();

    public async init(): Promise<void> {
        await this.login(CONFIG.token);

        /* Commands */
        const commandPath = path.join(__dirname, "..", "commands");
        fs.readdirSync(commandPath).forEach(async (dir) => {
            const cmds = readdirSync(`${commandPath}/${dir}`).filter((file) => file.endsWith(".js"));

            for (const file of cmds) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const { command } = await import(`${commandPath}/${dir}/${file}`);
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


        /* Buttons */
        const buttonsPath = path.join(__dirname, "..", "interactions", "buttons");
        fs.readdirSync(buttonsPath).forEach((dir) => {
            const buttonFiles = readdirSync(`${buttonsPath}/${dir}`).filter((file) => file.endsWith(".js"));

            for (const file of buttonFiles) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const { buttons } = require(`${buttonsPath}/${dir}/${file}`);
                this.buttons.set(buttons.name, buttons);

            }
        });

        /* Select Menus */
        const menuPath = path.join(__dirname, "..", "interactions", "selectMenus");
        fs.readdirSync(menuPath).forEach((dir) => {
            const menuFiles = readdirSync(`${menuPath}/${dir}`).filter((file) => file.endsWith(".js"));

            for (const file of menuFiles) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const { menu } = require(`${menuPath}/${dir}/${file}`);
                this.selectMenus.set(menu.name, menu);

            }
        });

        /* Slash Commands */
        const slashPath = path.join(__dirname, "..", "interactions", "slashCommands");
        fs.readdirSync(slashPath).forEach(async (dir) => {
            const slashCommmands = readdirSync(`${slashPath}/${dir}`).filter((file) => file.endsWith(".js"));

            for (const file of slashCommmands) {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const { slashCommand } = require(`${slashPath}/${dir}/${file}`);
                this.slashCommands.set(slashCommand.name, slashCommand);

            }
        });


    }

    public async commandFailed(msg: Message | CommandInteraction): Promise<void | Message> {
        if (msg instanceof Message) {
            return msg.reply({ content: "There was an error when executing the command" });

        }
        return msg.reply({ content: "There was an error when executing the command", ephemeral: true });


    }
}

export default ExtendedClient;


