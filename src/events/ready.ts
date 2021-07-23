import { Event } from "../interfaces/event";
import { STORAGE } from "../globals";

export const event: Event = {
    name: "ready",
    run: (client) => {
        console.log(`${client.user?.tag} is online!`);
        console.log(STORAGE);
    }
};