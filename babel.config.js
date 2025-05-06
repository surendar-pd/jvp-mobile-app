module.exports = function (/** @type {{ cache: (arg0: boolean) => void; }} */ api) {
	api.cache(true);
	return {
		presets: [
			[
				"babel-preset-expo",
				{ jsxImportSource: "nativewind", unstable_transformImportMeta: true },
			],
			"nativewind/babel",
		],
	};
};
