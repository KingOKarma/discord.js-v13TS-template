/* eslint-disable @typescript-eslint/member-ordering */
import { Message, PermissionResolvable } from "discord.js";
import Client from "../client/client";

type Run = (client: Client, message: Message, args: string[]) => void;

export default interface Command {
    cooldown?: number;
    cooldownResponse?: string;
    name: string;
    description: string;
    devonly?: boolean;
    example: string[];
    aliases?: string[];
    permissionsUser?: PermissionResolvable[];
    permissionsBot?: PermissionResolvable[];
    group: string;
    run: Run;

}
