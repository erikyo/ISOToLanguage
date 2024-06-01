import { langIso } from "./data/lang-iso.js";
import type {
	ISOLangCode,
	Language,
	LanguageData,
	LanguageDataFields,
	LanguageFields,
} from "./types.js";
import { validateISO } from "./validation.js";

/**
 * Retrieves the ISO language object based on the provided language code.
 *
 * @param {ISOLangCode | string} key - The language code to search for.
 * @param {string} fields - The fields to retrieve. If not provided, all fields are returned.
 * @return {ISOLanguage | false} The ISO language object corresponding to the language code, or false if the language code is invalid.
 */
export function getLanguage(
	key: string,
	fields?: string | string[] | LanguageDataFields[] | LanguageData[],
): LanguageData | string | string[] | false {
	let language: Language | false = false;
	let isoCode: ISOLangCode | false = false;

	// check if the key is a valid language code
	if (validateISO(key, "language")) {
		language = { ...langIso[key as ISOLangCode] } as Language;
		isoCode = key as ISOLangCode;
	} else {
		// Otherwise, loop for each language and find if the field matches the iso
		for (const lang in langIso) {
			const l = langIso[lang as ISOLangCode] as Language;
			// if the name matches the iso, then return the language
			if (l.name === key || l.original === key || l.iso3 === key) {
				language = l as Language;
				isoCode = lang as ISOLangCode;
				break;
			}
		}
	}

	if (language) {
		if (fields) {
			// if the fields are iso, return the isoCode otherwise create the array of fields to return
			if (fields === "iso2") {
				return isoCode;
			}
			/** @type {string[]} fieldsArray The array of fields to return */
			let fieldsArray: string[] = [];
			if (fields === "all") {
				fieldsArray = ["iso2", "name", "original", "iso3"];
			} else if (typeof fields === "string") {
				fieldsArray = [fields as LanguageDataFields];
			}

			// if the fields are not an iso, return the fieldsArray
			const collected: Partial<LanguageData> = {};
			if (Object.keys(fieldsArray).length === 1) {
				return language[Object.values(fieldsArray)[0] as LanguageFields];
			}
			for (const field of fieldsArray) {
				const key = field;
				if (key === "iso2") {
					collected.iso2 = isoCode as ISOLangCode;
				} else {
					collected[key as LanguageFields] = language[key as LanguageFields];
				}
			}

			// return the collected fields
			return collected as LanguageData;
		}
		// if the fields are not defined, return the language object
		return { ...language, iso2: isoCode } as LanguageData;
	}

	return false;
}
