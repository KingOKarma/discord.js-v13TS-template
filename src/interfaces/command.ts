/* eslint-disable @typescript-eslint/member-ordering */
import Client from "../client/client";
import { Message } from "discord.js";

type Run = (client: Client, message: Message, args: string[]) => void;

export default interface Command {
    name: string;
    description: string;
    devonly?: boolean;
    example: string[];
    aliases?: string[];
    group: string;
    run: Run;

}
