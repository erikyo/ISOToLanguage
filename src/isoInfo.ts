import { countriesIso } from "./data/countries-iso.js";
import { langIso } from "./data/lang-iso.js";
import { getIso } from "./getIso.js";
import type { Country, ISOCountry, ISOLanguage, Language } from "./types.js";
import { parseIso5Code } from "./utils.js";
import { validateISO, validateSeparator } from "./validation.js";

export function isoInfo(iso: string) {
	// detect the length of the iso
	if (iso.length === 2) {
		// if the length is 2, it is a country iso or a language iso2
		const isoType = validateISO(iso);
		if (isoType === "country" || isoType === "language") {
			return getIso(iso, isoType);
		}
	} else if (iso.length === 3) {
		let result: boolean | Country | Language = false;
		if (iso.toUpperCase() === iso) {
			Object.entries(countriesIso as ISOCountry).forEach((current) => {
				if (current[1].iso3 === iso) {
					result = current[1];
				}
			});
		} else if (iso.toLowerCase() === iso) {
			Object.entries(langIso as ISOLanguage).forEach((language) => {
				if (language[1].iso3 === iso) {
					result = language[1];
				}
			});
		}
		return result;
	} else if (iso.length === 5) {
		// extract the iso codes from the iso
		const isoCode = parseIso5Code(iso);
		return {
			type: validateSeparator(isoCode.separator),
			country: getIso(isoCode.country, "country"),
			language: getIso(isoCode.language, "language"),
		};
	}
	return false;
}
