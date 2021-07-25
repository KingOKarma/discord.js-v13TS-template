import Client from "../client";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Run = (client: Client, interaction: any) => void;

export default interface Interactions {
    name: string;
    run: Run;

}
