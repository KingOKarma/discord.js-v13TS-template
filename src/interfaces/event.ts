import Client from "../client/client";
import { ClientEvents } from "discord.js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Run = (client: Client, ...args: any[]) => void;

export interface Event {
    name: keyof ClientEvents;
    run: Run;
}
