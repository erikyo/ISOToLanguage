import { describe, expect, test } from "vitest";
import { getKeyValue } from "../src/";
import type { CountryDataFields } from "../src/types";

describe("getKeyValue", () => {
	test.each([
		["iso2", "name", undefined, undefined, [{ value: "Andorra", label: "AD" }]],
		[
			"original",
			"language",
			undefined,
			undefined,
			[{ value: "AND", label: "Andorra-AND" } /* ... */],
		],
	])(
		'should return the expected array for key "%s" and value "%s"',
		(key, value, labelKey, valueKey, expected) => {
			const result = getKeyValue(
				key as CountryDataFields,
				value as CountryDataFields,
			);
			expect(result).toEqual(expect.arrayContaining(expected));
		},
	);
});
