import https from "https";

export interface Language {
	languageCode: string;
	versionIndex: number;
}

export interface JDoodleResponse {
	output: string;
	statusCode: number;
	memory: number;
	cpuTime: number;
	error?: string;
}

const run = (language: Language, script: string): Promise<JDoodleResponse> => {
	return new Promise((resolve, reject) => {
		const req = https.request(
			{
				method: "POST",
				hostname: "www.jdoodle.com",
				port: 443,
				path: "/engine/execute",
				headers: {
					"Content-Type": "application/json",
					"x-requested-with": "XMLHttpRequest",
					referer: "https://www.jdoodle.com",
				},
			},
			(res) => {
				res.setEncoding("utf8");
				let responseBody = "";

				res.on("data", (chunk) => {
					responseBody += chunk;
				});

				res.on("end", () => {
					const response = JSON.parse(responseBody);
					resolve(response);
				});
			}
		);

		req.on("error", reject);
		req.write(
			JSON.stringify({
				language: language.languageCode,
				versionIndex: language.versionIndex,
				script,
			})
		);
		req.end();
	});
};

export default run;
module.exports = run;
