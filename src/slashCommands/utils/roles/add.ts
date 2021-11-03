import { CommandInteraction, GuildMember, Role } from "discord.js";

export async function add(intr: CommandInteraction, member: GuildMember, role: Role): Promise<void> {

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