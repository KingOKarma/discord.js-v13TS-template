import Client from "./client/client";

void new Client({
    intents: ["GUILD_MESSAGES", "GUILDS", "GUILD_BANS", "GUILD_MEMBERS", "DIRECT_MESSAGES"]
}).init().catch(console.error);
