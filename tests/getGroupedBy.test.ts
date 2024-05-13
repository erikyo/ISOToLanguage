import { describe, expect, test } from "vitest";
import {
	type Country,
	type ISOCountryCode,
	type ISOLangCode,
	ISOLanguage,
} from "../lib/types";
import { getCountriesByLanguage, getGroupedBy } from "../src/";
import {} from "../src/types";

describe("getGroupedBy", () => {
	test("groups by region", () => {
		const region = "Europe";
		const result = getGroupedBy("region", region);
		expect(result[region]).toBeDefined();
	});

	test("groups by continent", () => {
		const continent = "Africa";
		const result = getGroupedBy("continent", continent);
		expect(result[continent]).toBeDefined();
	});

	test("groups by subRegion", () => {
		const subRegion = "South America";
		const result = getGroupedBy("subRegion", subRegion);
		expect(result[subRegion]).toBeDefined();
	});

	test("handles unknown groupValue", () => {
		const groupValue = "Unknown";
		const result = getGroupedBy("region", groupValue);
		expect(result[groupValue]).toEqual([]);
	});

	test("returns all groups when no groupValue is passed", () => {
		const result = getGroupedBy("region", "");
		expect(result).toBeDefined();
	});
});

describe("getCountriesByLanguage", () => {
	test("returns countries that speak a given language", () => {
		const languages = ["en", "fr"] as ISOLangCode[];
		const result = getCountriesByLanguage(languages);

		// Check if the result is an object
		expect(result).toBeInstanceOf(Object);

		// Loop through the result and check if the countries speak at least one of the languages
		for (const countryIso in result) {
			const country: Country = result[countryIso as ISOCountryCode];
			expect(country).toHaveProperty("languages");
			expect(
				languages.some((language) => country.languages.includes(language)),
			).toBeTruthy();
		}

		// Optionally, check for specific countries known to speak these languages
		expect(result).toHaveProperty("US"); // Assuming 'US' is in the mock data and speaks English
		expect(result).toHaveProperty("FR"); // Assuming 'FR' is in the mock data and speaks French

		expect(result).not.toHaveProperty("JP"); // Assuming 'JP' does not speak 'en' or 'fr'
	});
});
