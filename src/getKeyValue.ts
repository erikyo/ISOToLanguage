import { countriesIso } from "./data/countries-iso";
import { getIso } from "./getIso";
import type { CountryDataFields } from "./types";

/**
 * Generates an array of objects suitable for React Select options based on the specified field.
 *
 * @param {string} key - The field to use as the key for the resulting object. It can be one of 'iso', 'language', 'name', 'original', 'language-code', or 'locale'.
 * @param {string} value - The field to use as the value for the resulting object. It can be one of 'iso', 'language', 'name', 'original', 'language-code', or 'locale'.
 * @param labelKey string - The key to use for the label of the resulting object. It defaults to 'label'.
 * @param valueKey string - The key to use for the value of the resulting object. It defaults to 'value'.
 * @returns {Object[]} An array of objects suitable for React Select options.
 */
export function getKeyValue(
	key: CountryDataFields,
	value: CountryDataFields,
	labelKey = "label",
	valueKey = "value",
) {
	const unpackData = (data: unknown, field?: string): string[] => {
		if (typeof data === "string") {
			return [data];
		}
		if (Array.isArray(data)) {
			return data.flatMap((item) => unpackData(item, field));
		}
		if (typeof data === "object" && data !== null) {
			if (field && field in data) {
				return [data[field as keyof typeof data]];
			}
			return Object.values(data).flatMap((item) => unpackData(item, field));
		}
		return data as string[];
	};

	return Object.entries(countriesIso).flatMap(([iso]) => {
		const keyValue = getIso(iso, undefined, key);
		const fieldValue = getIso(iso, undefined, value);

		const unpackedKeyValues = unpackData(keyValue, key);
		const unpackedFieldValues = unpackData(fieldValue, value);

		if (unpackedKeyValues || unpackedFieldValues) {
			return unpackedKeyValues?.flatMap((k: string) =>
				unpackedFieldValues?.map((f: string) => ({
					[labelKey]: unpackedFieldValues.length > 1 ? `${k}-${f}` : k,
					[valueKey]: unpackedKeyValues.length > 1 ? `${f} (${k})` : f,
				})),
			);
		}
	});
}
