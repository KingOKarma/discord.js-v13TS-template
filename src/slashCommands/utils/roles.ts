import { GuildMember, Role } from "discord.js";
import { SlashCommands } from "../../interfaces/slashCommands";
import { slashCommandTypes } from "../../globals";

export const slashCommand: SlashCommands = {
    // Note aliases are optional
    description: "Interact with the roles of a server",
    guildOnly: true,
    name: "roles",
    options: [
        {
            description: "Adds a role onto a User",
            name: "add",
            options: [
                {
                    description: "Who will you be adding a role to?",
                    name: "user",
                    required: true,
                    type: slashCommandTypes.user
                },
                {
                    description: "What role are you adding?",
                    name: "role",
                    required: true,
                    type: slashCommandTypes.role
                }
            ],
            type: slashCommandTypes.subCommand
        },
        {
            description: "Who will you be removing a role from?",
            name: "remove",
            options: [
                {
                    description: "What will I be saying",
                    name: "user",
                    required: true,
                    type: slashCommandTypes.user
                },
                {
                    description: "What role are you removing?",
                    name: "role",
                    required: true,
                    type: slashCommandTypes.role
                }
            ],
            type: slashCommandTypes.subCommand
        }
    ],
    permissionsBot: ["MANAGE_ROLES"],
    permissionsUser: ["MANAGE_ROLES"],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    run: async (client, intr) => {

        const { guild } = intr;
        if (guild === null) return client.commandFailed(intr);

        const user = intr.options.get("user");
        if (user === null) return client.commandFailed(intr);


        const commandRole = intr.options.get("role");
        if (commandRole === null) return client.commandFailed(intr);

        const { member } = user;
        if (!(member instanceof GuildMember)) return client.commandFailed(intr);

        const { role } = commandRole;
        if (!(role instanceof Role)) return client.commandFailed(intr);

        switch (intr.options.getSubcommand()) {
            case "add": {

                if (member.roles.cache.has(role.id)) {
                    return intr.reply({ content: `${member} Already has the role ${role}`, ephemeral: true });
                }
                try {
                    await member.roles.add(role);

                } catch (er) {
                    return intr.reply({ content: `I was not able to give ${member} the ${role} role!`, ephemeral: true });

                }

                return intr.reply({ content: `${member} has been given the ${role} role!`, ephemeral: true });

            }

            case "remove": {
                if (!member.roles.cache.has(role.id)) {
                    return intr.reply({ content: `${member} Doesn't has the role ${role}`, ephemeral: true });
                }

                try {
                    await member.roles.remove(role);

                } catch (er) {
                    return intr.reply({ content: `I was not able to remove the role ${role} from ${member}!`, ephemeral: true });

                }

                return intr.reply({ content: `I have taken the role ${role} away from ${member}!`, ephemeral: true });
            }

            default: {
                return intr.reply({ content: "There was an error when executing the command", ephemeral: true });
            }
        }

    }
};
