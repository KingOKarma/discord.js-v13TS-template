import { Guild, GuildChannel, GuildMember, Message, Role, ThreadChannel } from "discord.js";
import { Command } from "../interfaces";

// Added getRole function in here incase you don't like getMember (;
export function getRole(rid: string, guild: Guild): Role | undefined {
    let ridParsed = rid;
    // Check if a role was tagged or not. If the role was tagged remove the
    // Tag from rid.
    if (rid.startsWith("<@&") && rid.endsWith(">")) {
        const re = new RegExp("[<@&>]", "g");
        ridParsed = rid.replace(re, "");
    }
    // Try recovering the role and report if it was successful or not.
    try {
        return guild.roles.cache.get(ridParsed);
    } catch (e) {
        console.log(`Role not found because ${e}`);
        return undefined;
    }
}

export async function getMember(uid: string, guild: Guild): Promise<GuildMember | null> {
    let uidParsed = uid;
    // Check if a member was tagged or not. If the member was tagged remove the
    // Tag from uid.
    if (uid.startsWith("<@") && uid.endsWith(">")) {
        const re = new RegExp("[<@!>]", "g");
        uidParsed = uid.replace(re, "");
    }
    // Try recovering the role and report if it was successful or not.
    try {
        return await guild.members.fetch(uidParsed);
    } catch (e) {
        console.log(`Member not found because ${e}`);
        return null;
    }
}

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

/**
 * Used to add a role to an array
 * @param {string} message string to convert
 * @param {string} member Member instance
* @returns string
 */
export function formatString(message: string, member: GuildMember ): string {
    let formatedText = message;

    if (message.includes("{user}")) {
        const replace = new RegExp("{user}", "g");
        formatedText = formatedText.replace(replace, `<@${member.id}>`);
    }

    if (message.includes("{user.tag}")) {
        const replace = new RegExp("{user.tag}", "g");
        formatedText = formatedText.replace(replace, member.user.tag);
    }

    if (message.includes("{user.name}")) {
        const replace = new RegExp("{user}", "g");
        formatedText = formatedText.replace(replace, member.user.username);
    }

    if (message.includes("{count}")) {
        const replace = new RegExp("{count}", "g");
        formatedText = formatedText.replace(replace, member.guild.memberCount.toString());
    }

    if (message.includes("{server}")) {
        const replace = new RegExp("{server}", "g");
        formatedText = formatedText.replace(replace, member.guild.name);
    }

    return formatedText;

}

export type AddResponse = "noRole" | "onList" | "pass";

/**
 * Used to add a role to an array
 * @param {Message} msg Message instance
 * @param {string} rid The Role ID of the User
 * @param {string[]} array The array to add to
 */
export async function addRole(
    msg: Message,
    rid: string,
    array: string[]
): Promise<AddResponse> {

    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (msg.guild === null) return "noRole";

    const role = getRole(rid, msg.guild);
    // If the first argument is the @everyone id or undefined return
    if (role === undefined) {
        return "noRole";
    }

    if (role.id === msg.guild.id) return "noRole";


    const roleID: string = role.id;

    // Checks if the role they want to add is already added
    if (array.includes(roleID)) {
        return "onList";
    }

    // Otherwise finally add it to the list
    array.push(roleID);
    return "pass";
}

export type RemoveResponse = "noRole" | "notOnList" | "pass";

/**
   * Used to remove a role from an array
   * @param {Message} msg Message instance
   * @param {string} rid The Role ID of the User
   * @param {string[]} array The array to remove from
   */
export async function removeRole(
    msg: Message,
    rid: string,
    array: string[]
): Promise<RemoveResponse> {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (msg.guild === null) return "noRole";

    const role = getRole(rid, msg.guild);
    // If the first argument is the @everyone id or undefined return
    if (role === undefined || rid === msg.guild.id) {
        return "noRole";
    }

    // Checks if the role they want to add is already added
    if (!array.includes(role.id)) {
        return "notOnList";
        // Return msg.say(`\`${role.name}\` is not on the list! ❌`);

    }

    // Checks the location in the array for the role
    const roleIndex = array.indexOf(role.id);

    // Removes the role from the array with the index number
    array.splice(roleIndex, 1);

    return "pass";
}

/**
   * Used to list the roles from an array
   * @param {string[]} array The array to list
   * @returns {MessageEmbed} Emeded list of roles
   */
export function listRoles(
    array: string[]
): string[] | null {
    if (!array.length) {
        return null;
    }

    return array.map((list) => `○ <@&${list}>\n`);
}


/**
   * Capitalise the first letter of a string
   * @param {string} s The string to capitalise
   * @returns {string} The capitalised string
   */
export function capitalize(s: string): string {
    return s[0].toUpperCase() + s.slice(1);
}

/**
 * Used to create pages from a user entity
 * @param {Array} array The array to page
 * @param {number} pageSize How big are each of the pages?
 * @param {number} pageNumber Which Page number do you wish to be on?
 * @returns {Array} an array
 */
export function commandPaginate(array: Command[], pageSize: number, pageNumber: number): Command[] {
    return array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
}