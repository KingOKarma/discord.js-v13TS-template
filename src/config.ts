import { dump, load } from "js-yaml";
import { CONFIG } from "./globals";
import fs from "fs";

export interface DevEnv {
    devServer: string;
    isDev: boolean;
}

/**
 * This represents the config.yml
 * @class Config
 * @property {string} token
 * @property {string} prefix
 * @property {string[]} owners
 */
export default class Config {
    private static readonly _configLocation = "./config.yml";

    public readonly devEnv: DevEnv;

    public readonly owners: string[];

    public readonly prefix: string;

    public readonly token: string;

    private constructor() {
        this.devEnv = { devServer: "", isDev: false };
        this.owners = [""];
        this.prefix = "";
        this.token = "";
    }

    /**
       *  Call getConfig instead of constructor
       */
    public static getConfig(): Config {
        if (!fs.existsSync(Config._configLocation)) {
            throw new Error("Please create a config.yml");
        }
        const fileContents = fs.readFileSync(
            Config._configLocation,
            "utf-8"
        );
        const casted = load(fileContents) as Config;

        return casted;
    }

    /**
   *  Safe the config to the congfig.yml default location
   */
    public static saveConfig(): void {
        fs.writeFileSync(Config._configLocation, dump(CONFIG));
    }
}
