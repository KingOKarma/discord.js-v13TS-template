import { Interaction, PermissionString } from "discord.js";
import { CONFIG } from "../globals";
import { Event } from "../interfaces";
import { formatPermsArray } from "../utils/formatPermsArray";

export const event: Event = {
    name: "interactionCreate",
    run: async (client, intr: Interaction) => {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (intr.isButton()) {
            const button = client.buttons.get(intr.customId);
            if (button) {
                button.run(client, intr);
            }
        }

        if (intr.isCommand()) {
            const slashCommand = client.slashCommands.get(intr.commandName);
            if (slashCommand) {

                if (slashCommand.devOnly ?? false) {
                    if (!CONFIG.owners.includes(intr.user.id)) {
                        return intr.reply({ content: "This Command may only be used by the bot's developers!", ephemeral: true } );
                    }
                }

                if (slashCommand.guildOnly ?? false) {
                    if (!intr.inGuild()) {
                        return intr.reply({ content: "This Command can only be used inside of servers!", ephemeral: true } );
                    }
                }

                if (slashCommand.dmOnly ?? false) {
                    if (intr.inGuild()) {
                        return intr.reply({ content: "This Command can only be used inside of DMs!", ephemeral: true } );
                    }
                }
                const userPerms = formatPermsArray(slashCommand.permissionsUser as PermissionString[]);

                if (!(intr.memberPermissions?.has(slashCommand.permissionsUser ?? []) ?? false)) {
                    return intr.reply({ content: `You require! the permission(s)\n ${userPerms}\nTo use this command`, ephemeral: true } );

                }

                const clientPerms = formatPermsArray(slashCommand.permissionsBot as PermissionString[]);

                if (!(intr.guild?.me?.permissions.has(slashCommand.permissionsBot ?? []) ?? false)) {
                    return intr.reply({ content: `I require! the permission(s)\n ${clientPerms}\nTo use this command`, ephemeral: true } );

                }

                slashCommand.run(client, intr);
            }

        }
    }
};