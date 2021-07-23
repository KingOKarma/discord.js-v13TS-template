import { Collection } from "discord.js";
import Config from "./config";
import Storage from "./storage";

export const CONFIG = Config.getConfig();

export const STORAGE = Storage.getConfig();

export const commands = new Collection;