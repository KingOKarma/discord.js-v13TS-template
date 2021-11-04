import SelectMenus from "../../../interfaces/selectMenus";

export const menu: SelectMenus = {
    name: "test",
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    run: async(client, intr) => {
        const [value] = intr.values;

        switch (value) {
            case "amazing": {
                return intr.reply({ content: "Thanks for the amazing feedback!", ephemeral: true });

            }
            case "ok": {
                return intr.reply({ content: "I hope we can do better! Thanks for the feedback!", ephemeral: true });

            }
            case "bad": {
                return intr.reply({ content: "Oh.. That's a shame, I wonder if theres anything we can do to be better!", ephemeral: true });

            }
            case "horrible": {
                return intr.reply({ content: "We're sorry the service has been bad, do you think you "
                + "could contact us and give us constructive feedback?", ephemeral: true });

            }
            default: {
                return intr.reply({ content: "There was an error please try again", ephemeral: true });

            }

        }

    }
};
