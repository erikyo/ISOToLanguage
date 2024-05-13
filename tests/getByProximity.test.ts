import { describe, expect, it } from "vitest";
import { getNearestCountries } from "../src/getByProximity";

describe("getNearestCountries", () => {
	it("Should return the countries near the italy ", () => {
		const nearest = getNearestCountries("IT", 1000);
		console.log(nearest);
		expect(nearest).toMatchObject([
			{ iso: "IT", coordinates: [41.8719, 12.5674], distance: 0 },
			{
				iso: "VA",
				coordinates: [41.9029, 12.4534],
				distance: 10.04676735128846,
			},
			{
				iso: "SM",
				coordinates: [43.9424, 12.4578],
				distance: 230.40201087435003,
			},
			{
				iso: "HR",
				coordinates: [45.1, 15.2],
				distance: 417.01956518047405,
			},
			{
				iso: "MC",
				coordinates: [43.7503, 7.4128],
				distance: 469.37405276643517,
			},
			{
				iso: "BA",
				coordinates: [43.9159, 17.6791],
				distance: 474.2778009042667,
			},
			{
				iso: "SI",
				coordinates: [46.1512, 14.9955],
				distance: 513.8640413087771,
			},
			{
				iso: "ME",
				coordinates: [42.7087, 19.3744],
				distance: 567.4303782156377,
			},
			{
				iso: "LI",
				coordinates: [47.166, 9.5554],
				distance: 635.1401466708603,
			},
			{
				iso: "AL",
				coordinates: [41.1533, 20.1683],
				distance: 637.6883921375974,
			},
			{
				iso: "AT",
				coordinates: [47.5162, 14.5501],
				distance: 646.8280352835117,
			},
			{
				iso: "CH",
				coordinates: [46.8182, 8.2275],
				distance: 649.0693011095187,
			},
			{
				iso: "MT",
				coordinates: [35.9375, 14.3754],
				distance: 678.1192634942938,
			},
			{
				iso: "XK",
				coordinates: [42.6026, 20.903],
				distance: 690.7348154830586,
			},
			{
				iso: "RS",
				coordinates: [44.0165, 21.0059],
				distance: 726.6754233126602,
			},
			{
				iso: "MK",
				coordinates: [41.6086, 21.7453],
				distance: 761.6932798987688,
			},
			{
				iso: "HU",
				coordinates: [47.1625, 19.5033],
				distance: 804.6598779515814,
			},
			{
				iso: "GR",
				coordinates: [39.0742, 21.8243],
				distance: 841.9857682997398,
			},
			{
				iso: "AD",
				coordinates: [42.5462, 1.6016],
				distance: 905.6320231312061,
			},
			{
				iso: "CZ",
				coordinates: [49.8175, 15.473],
				distance: 911.5367886248189,
			},
			{
				iso: "TN",
				coordinates: [33.8869, 9.5375],
				distance: 926.6812884937063,
			},
			{
				iso: "SK",
				coordinates: [48.669, 19.699],
				distance: 938.6194450746992,
			},
			{
				iso: "FR",
				coordinates: [46.2276, 2.2137],
				distance: 957.6636949908722,
			},
		]);
	});
});
