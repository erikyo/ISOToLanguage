import { countriesIso } from "./data/countries-iso.js";
import { langIso } from "./data/lang-iso.js";
import type { IsoCodeFormat, IsoType } from "./types.js";

function isValidCountry(iso: string): boolean {
	return iso in countriesIso;
}

function isValidLanguage(iso: string): boolean {
	return iso in langIso;
}

export function validateISO(iso: string, type?: IsoType): boolean | IsoType {
	if (!type) {
		if (isValidCountry(iso)) return "country";
		if (isValidLanguage(iso)) return "language";
		return false;
	}
	switch (type) {
		case "country":
			return isValidCountry(iso);
		case "language":
			return isValidLanguage(iso);
	}
}

export function validateSeparator(separator: string): boolean | IsoCodeFormat {
	if (separator.length === 1) {
		if (separator === "-") return "language-code";
		if (separator === "_") return "locale";
	}
	return false;
}
