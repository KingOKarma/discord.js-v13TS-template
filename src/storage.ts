import { dump, load } from "js-yaml";
import { STORAGE } from "./globals";
import { Snowflake } from "discord.js";
import fs from "fs";


// This is an example for how you may want to use storage.yml
export interface IDs {
    categoryID: Snowflake | null;
    logID: Snowflake;
    staffID: Snowflake;
}

/**
 * This represents the storage.yml
 * @class Storage
 * @property {Servers} servers


 */
export default class Storage {
    private static readonly _configLocation = "./storage.yml";

    public ids: IDs;

    private constructor() {
        this.ids = { categoryID: "0", logID: "0", staffID: "0" };

    }

    /**
       *  Call getConfig instead of constructor
       */
    public static getConfig(): Storage {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!fs.existsSync(Storage._configLocation)) {
            throw new Error("Please create a storage.yml");
        }
        const fileContents = fs.readFileSync(
            Storage._configLocation,
            "utf-8"
        );
        const casted = load(fileContents) as Storage;

        return casted;
    }

    /**
   *  Safe the config to the storage.yml default location
   */
    public static saveConfig(): void {
        fs.writeFileSync(Storage._configLocation, dump(STORAGE));
    }
}