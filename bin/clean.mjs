//!/usr/bin/env node
import fs from "node:fs";

const libDirectoryPath = "./lib";

console.log(`🗑 Removing old files from ${libDirectoryPath}`);

//check if the directory exists
if (!fs.existsSync(libDirectoryPath)) {
	console.log("Directory not found... skipping");
} else {
	await fs.rm(libDirectoryPath, { recursive: true, force: true }, (err) => {
		if (err) {
			// File deletion failed
			console.error(err.message);
			return;
		}
		console.log(`Directory ${libDirectoryPath} deleted successfully`);
	});
}
