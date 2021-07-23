/* eslint-disable @typescript-eslint/member-ordering */
import Client from "../client";
import { Message } from "discord.js";

type Run = (client: Client, message: Message, args: string[]) => void;

export default interface Command {
    name: string;
    descirption: string;
    aliases?: string[];
    group: string;
    run: Run;

}
