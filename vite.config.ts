import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["**/?(*.)+(spec|test).ts"],
		coverage: {
			include: ["src/**/*.{ts,tsx}"],
			reporter: ["text", "lcov"],
		},
	},
});
