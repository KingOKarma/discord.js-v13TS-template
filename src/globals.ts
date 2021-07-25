import { Collection, MessageButton } from "discord.js";
import Config from "./config";
import Storage from "./storage";

export const CONFIG = Config.getConfig();

export const STORAGE = Storage.getConfig();

export const commands = new Collection;

export const deleteButton = new MessageButton()
    .setCustomId("delete")
    .setLabel("❌")
    .setStyle("DANGER");