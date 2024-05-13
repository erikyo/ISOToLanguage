import { describe, expect, it } from "vitest";
import { getIso } from "../src/";
import { countriesIso } from "../src/data/countries-iso";
import { langIso } from "../src/data/lang-iso";

describe("ISO", () => {
	it('should return languages for the provided ISO code and type "locale"', () => {
		const isoCode = "AD";
		const result = getIso(isoCode, "country", "locale");
		const expectedLanguages = countriesIso[isoCode].languages.map(
			(language) => `${language}_${isoCode}`,
		);

		expect(result).toEqual(expectedLanguages);
	});

	it('should return languages for the provided ISO code and type "language-code"', () => {
		const isoCode = "AD";
		const result = getIso(isoCode, "country", "language-code");
		const expectedLanguages = countriesIso[isoCode].languages.map(
			(language) => `${language}-${isoCode}`,
		);

		expect(result).toEqual(expectedLanguages);
	});

	it("should return false for an invalid type", () => {
		const isoCode = "AD";
		const result = getIso(
			isoCode,
			"country",
			"invalidType" as unknown as "locale",
		);

		expect(result).toMatchObject({
			languages: ["ca"],
			name: "Andorra",
			original: "Andorra",
		});
	});

	it("should return ISO data for a valid ISO code", () => {
		const validISO = "AD";
		const result = getIso(validISO);
		const expectedData = { iso2: "AD", ...countriesIso[validISO] };

		expect(result).toEqual(expectedData);
	});

	it("should return ISO data for a valid ISO code", () => {
		const validISO = "HH";
		const result = getIso(validISO);

		expect(result).toBeFalsy();
	});

	it('should return languages for the provided ISO code and type "languages"', () => {
		const isoCode = "AD";
		const result = getIso(isoCode, "country", "locale");
		const expectedLanguages = countriesIso[isoCode].languages.map(
			(language) => `${language}_${isoCode}`,
		);

		expect(result).toEqual(expectedLanguages);
	});

	it('should return name for the provided ISO code and type "names"', () => {
		const isoCode = "AD";
		const result = getIso(isoCode, "country", "name");
		const expectedName = countriesIso[isoCode].name;

		expect(result).toEqual(expectedName);
	});

	it('should return original data for the provided ISO code and type "original"', () => {
		const isoCode = "AD";
		const result = getIso(isoCode, "country", "original");
		const expectedOriginal = countriesIso[isoCode].original;

		expect(result).toEqual(expectedOriginal);
	});

	it("should return the language data for the provided ISO code", () => {
		const isoCode = "it";
		const result = getIso(isoCode, "language");
		const expectedOriginal = { ...langIso[isoCode], iso2: isoCode };

		expect(result).toEqual(expectedOriginal);
	});

	it("should return all the language data for the provided ISO code", () => {
		const isoCode = "it";
		const result = getIso(isoCode, "language", "all");
		const expectedOriginal = { ...langIso[isoCode], iso2: isoCode };

		expect(result).toEqual(expectedOriginal);
	});

	it("should return a field for the provided ISO2 code", () => {
		const isoCode = "it";
		const result = getIso(isoCode, "language", "name");
		const expectedOriginal = langIso[isoCode].name;

		expect(result).toEqual(expectedOriginal);
	});

	it("should return a field for the provided original name", () => {
		const isoCode = "Italia";
		const result = getIso(isoCode, "country", "name");
		const expectedOriginal = countriesIso["IT"].name;

		expect(result).toEqual(expectedOriginal);
	});

	it("should return a field for the provided language ISO3 code", () => {
		const isoCode = "ita";
		const result = getIso(isoCode, "language", "iso2");
		const expectedOriginal = "it";

		expect(result).toEqual(expectedOriginal);
	});

	it("should return a field for the provided country ISO3 code", () => {
		const isoCode = "ITA";
		const result = getIso(isoCode, "country", "iso2");
		const expectedOriginal = "IT";

		expect(result).toEqual(expectedOriginal);
	});

	it('should return the array of fields for the provided ISO code and type "extra fields" and "geo fields"', () => {
		const isoCode = "IT";
		const result = getIso(isoCode, "country", ["capital", "currency"]);
		const expectedOriginal = {
			capital: "Rome",
			currency: {
				symbol: "€",
				name: "Euro",
			},
		};

		expect(result).toMatchObject(expectedOriginal);
	});

	it("should return ISO data for the provided ISO code and no type", () => {
		const isoCode = "ca";
		const result = getIso(isoCode);
		const expectedData = langIso[isoCode];

		expect(result).toEqual({ iso2: "ca", ...expectedData });
	});

	it("should return ISO data for the provided ISO code and no type", () => {
		const isoCode = null;
		const result = getIso(isoCode as unknown as string);
		const expectedData = false;

		expect(result).toEqual(expectedData);
	});

	it("should return ISO data for a valid ISO code", () => {
		const validISO = "IT";
		const result = getIso(validISO);
		const expectedData = {
			iso2: "IT",
			iso3: "ITA",
			languages: ["it"],
			name: "Italy",
			original: "Italia",
		};

		expect(result).toEqual(expectedData);
	});

	it("should return false for an invalid ISO code", () => {
		const invalidISO = "InvalidCode";
		const result = getIso(invalidISO);

		expect(result).toBe(false);
	});

	it("should return false for an empty ISO code", () => {
		const emptyISO = "";
		const result = getIso(emptyISO);

		expect(result).toBe(false);
	});

	it("should return false for null ISO code", () => {
		const result = getIso(null as unknown as string);

		expect(result).toBe(false);
	});

	it("should return false for a non-string ISO code", () => {
		const nonStringISO = 123;
		const result = getIso(nonStringISO as unknown as string);

		expect(result).toBe(false);
	});
});
