import Client from "../client/client";
import { SelectMenuInteraction } from "discord.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Run = (client: Client, interaction: SelectMenuInteraction) => void;

export default interface SelectMenus {
    name: string;
    run: Run;

}
