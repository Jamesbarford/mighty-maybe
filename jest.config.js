module.exports = {
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	automock: false,
	globals: {
		"ts-jest": {
			tsConfig: "tsconfig.json",
			isolatedModules: true,
			diagnostics: {
				pathRegex: ".*\\.(test|spec|unit)\\.tsx?$",
				warnOnly: true
			},
			window: true
		}
	},
	testRegex: ".*\\.(test|spec|unit)\\.tsx?$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};

