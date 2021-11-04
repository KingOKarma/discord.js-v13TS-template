import { CommandInteraction, GuildMember, Role } from "discord.js";

export async function remove(intr: CommandInteraction, member: GuildMember, role: Role): Promise<void> {

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