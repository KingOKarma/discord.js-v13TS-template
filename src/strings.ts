import { dump, load } from "js-yaml";
import { STRINGS } from "./globals";
import fs from "fs";

export interface Errors {
    clientRegisterTime: string;
}

export interface Info {
    ready: string;
}

/**
 * This represents the strings.yml
 * @class Strings
 * @property {Errors} errors Error Strings
 * @property {Info} info Info Strings
 */
export default class Strings {
    private static readonly _configLocation = "./strings.yml";

    public errors: Errors;

    public info: Info;

    private constructor() {
        this.errors = {
            clientRegisterTime: ""
        };

        this.info = {
            ready: ""
        };

    }

    /**
       *  Call getConfig instead of constructor
       */
    public static getConfig(): Strings {
        // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
        if (!fs.existsSync(Strings._configLocation)) {
            throw new Error("Please create a strings.yml");
        }
        const fileContents = fs.readFileSync(
            Strings._configLocation,
            "utf-8"
        );
        const casted = load(fileContents) as Strings;

        return casted;
    }

    /**
   *  Save the strings to the strings.yml default location
   */
    public static saveConfig(): void {
        fs.writeFileSync(Strings._configLocation, dump(STRINGS));
    }
}