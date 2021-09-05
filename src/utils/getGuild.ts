import { Client, Guild } from "discord.js";

/**
 * Used to add a role to an array
 * @param {string} guildID Guild's ID
 * @param {Client} client Client Instance
* @returns string
 */
export async function getGuild(guildID: string, client: Client): Promise<Guild | null> {
    try {
        return await client.guilds.fetch(guildID);
    } catch (e) {
        return null;
    }
}