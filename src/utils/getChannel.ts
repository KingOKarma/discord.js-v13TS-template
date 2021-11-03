import { Guild, GuildChannel, ThreadChannel } from "discord.js";
/**
 * Used to get a channel using fetch
 * @param {string} cid The channel's ID
 * @param {Guild} guild Guild Instance
*  @returns GuildChannel | null
 */
export async function getChannel(cid: string | null, guild: Guild | null): Promise<GuildChannel | ThreadChannel | null> {
    if (typeof cid !== "string") return null;
    if (!(guild instanceof Guild)) return null;
    let cidParsed = cid;

    // Check if a member was tagged or not. If the member was tagged remove the
    // Tag from uid.
    if (cid.startsWith("<#") && cid.endsWith(">")) {
        const re = new RegExp("[<#>]", "g");
        cidParsed = cid.replace(re, "");
    }

    // Try recovering the role and report if it was successful or not.
    try {
        return await guild.channels.fetch(cidParsed);
    } catch (e) {
        return null;
    }
}
