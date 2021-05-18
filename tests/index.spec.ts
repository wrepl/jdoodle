import jdoodle, { Language } from "../src";

test("javascript", async () => {
	const language: Language = {
		languageCode: "nodejs",
		versionIndex: 2,
	};

	const response = await jdoodle(language, "console.log('Hello World!')");
	expect(response.output.trim()).toBe("Hello World!");
});
