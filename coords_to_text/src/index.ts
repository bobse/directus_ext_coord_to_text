import { defineHook } from "@directus/extensions-sdk";
import { coordsToText } from "./coordsToText";
import { config } from "./config";
import _ from "lodash";

export default defineHook(({ filter }) => {
    filter("items.create", async (input: any, { collection }) => {
        await changeInput(input, collection);
        return input;
    });

    filter("items.update", async (input: any, { keys, collection }) => {
        await changeInput(input, collection);
        return input;
    });
});

async function changeInput(input: any, collection: string): Promise<void> {
    const inputValue = getInputFieldValue(input, config.inputField);
    if (collection === config.collection && inputValue) {
        const textValue = await coordsToText(inputValue);
        setInputTargetField(input, config.targetField, textValue);
    }
}

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
