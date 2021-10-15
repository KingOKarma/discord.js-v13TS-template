import { Guild, Role } from "discord.js";

/**
 * Used to get a Role instance using fetch
 * @param {string} rid The Role's ID
 * @param {Guild} guild the Guild Instance
*  @returns Role
 */
export async function getRole(rid: string | null, guild: Guild | null): Promise<Role | null> {
    if (rid === null) return null;
    if (guild === null) return null;

    let ridParsed = rid;
    // Check if a role was tagged or not. If the role was tagged remove the
    // Tag from rid.
    if (rid.startsWith("<@&") && rid.endsWith(">")) {
        const re = new RegExp("[<@&>]", "g");
        ridParsed = rid.replace(re, "");
    }
    // Try recovering the role and report if it was successful or not.
    try {
        return await guild.roles.fetch(ridParsed);
    } catch (e) {
        return null;
    }
}