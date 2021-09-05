import { GuildMember } from "discord.js";

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