import { defineHook } from "@directus/extensions-sdk";
import { coordsToText } from "./coordsToText";
import { config } from "./config";
import _ from "lodash";

export default defineHook(({ filter, action }) => {
    filter("items.create", async (input: any, { collection }) => {
        console.log(JSON.stringify(input));
        const inputValue = getInputFieldValue(input, config.inputField);
        if (collection === config.collection && inputValue) {
            const textValue = await coordsToText(inputValue);
            setInputTargetField(input, config.targetField, textValue);
            console.log(JSON.stringify(input));
        }
        return input;
    });

    filter("items.update", (input, { keys, collection }) => {
        console.log("Item updated!");
        console.log(keys);
        console.log(`colection: ${collection}`);
        console.log(`input: ${JSON.stringify(input)}`);
    });
});

function getInputFieldValue(input: any, inputField: string): any {
    // using lodash to get the inputField because it can be a nested field
    return _.get(input, inputField);
}

function setInputTargetField(
    input: any,
    targetField: string,
    value: string
): void {
    // using lodash to set the inputField because it can be a nested field
    _.set(input, targetField, value);
}
