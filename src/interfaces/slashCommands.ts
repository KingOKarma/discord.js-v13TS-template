/* eslint-disable @typescript-eslint/member-ordering */
import { ApplicationCommandOptionData, CommandInteraction } from "discord.js";
import Client from "../client/client";

type Run = (client: Client, interaction: CommandInteraction) => void;

export interface SlashCommands {
    name: string;
    description: string;
    options?: ApplicationCommandOptionData[];
    defaultPermission?: boolean;
    run: Run;

}
