import { describe, expect, it } from "vitest";
import { isoInfo } from "../src/";

describe("isoInfo", () => {
	it("should return the information about the iso language ", () => {
		const infoString = isoInfo("it");
		expect(infoString).toMatchObject({
			name: "Italian",
			original: "Italiano",
			iso3: "ita",
			iso2: "it",
		});
	});
	it("should return the information about the iso language ", () => {
		const infoString2 = isoInfo("IT");
		const infoString3 = isoInfo("ITA");
		const expected = {
			languages: ["it"],
			name: "Italy",
			original: "Italia",
			iso3: "ITA",
		};
		expect(infoString2).toMatchObject(expected);
		expect(infoString3).toMatchObject(expected);
	});
	it("should return the information about the iso language ", () => {
		const infoStringLocale = isoInfo("it_IT");
		const infoStringLang = isoInfo("it-IT");
		const expected = {
			country: {
				iso2: "IT",
				iso3: "ITA",
				languages: ["it"],
				name: "Italy",
				original: "Italia",
			},
			language: {
				name: "Italian",
				original: "Italiano",
				iso3: "ita",
				iso2: "it",
			},
		};
		expect(infoStringLocale).toMatchObject({ ...expected, type: "locale" });
		expect(infoStringLang).toMatchObject({
			...expected,
			type: "language-code",
		});
	});
});
