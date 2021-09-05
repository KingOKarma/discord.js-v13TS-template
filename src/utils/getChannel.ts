import { Guild, GuildChannel, ThreadChannel } from "discord.js";

export function getChannel(cid: string, guild: Guild): GuildChannel | ThreadChannel | undefined {
    let cidParsed = cid;
    // Check if a member was tagged or not. If the member was tagged remove the
    // Tag from uid.
    if (cid.startsWith("<#") && cid.endsWith(">")) {
        const re = new RegExp("[<#>]", "g");
        cidParsed = cid.replace(re, "");
    }
    // Try recovering the role and report if it was successful or not.
    try {
        return guild.channels.cache.get(cidParsed);
    } catch (e) {
        console.log(`Member not found because ${e}`);
        return undefined;
    }
}