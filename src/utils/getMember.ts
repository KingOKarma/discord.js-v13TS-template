import { Guild, GuildMember } from "discord.js";

/**
 * Used to get a Member instance using fetch
 * @param {string} uid The Member's ID
 * @param {Guild} guild the Guild Instance
*  @returns GuildMember
 */
export async function getMember(uid: string | null, guild: Guild | null): Promise<GuildMember | null> {
    if (typeof uid !== "string") return null;
    if (!(guild instanceof Guild)) return null;

    let uidParsed = uid;

    if (uid.startsWith("<@") && uid.endsWith(">")) {
        const re = new RegExp("[<@!>]", "g");
        uidParsed = uid.replace(re, "");
    }

    try {
        return await guild.members.fetch(uidParsed);
    } catch (e) {
        return null;
    }
}
