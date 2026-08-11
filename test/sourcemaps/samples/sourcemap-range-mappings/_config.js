const assert = require('node:assert');

module.exports = defineTest({
	description: 'emits range mappings when output.sourcemapRangeMappings is true',
	options: {
		output: {
			sourcemapRangeMappings: true
		}
	},
	test(code, map, { format }) {
		assert.equal(typeof map.rangeMappings, 'string');

		// The extension encodes one entry per generated line, so it has to stay
		// aligned with "mappings" or a consumer cannot line the two up. This has to
		// hold for the indented formats as well.
		assert.equal(
			map.rangeMappings.split(';').length,
			map.mappings.split(';').length,
			'rangeMappings and mappings must describe the same number of lines'
		);

		if (format !== 'es') return;

		// Two unedited chunks, each contributing a segment where it starts (flagged
		// as a range) and one where it ends.
		assert.equal(map.mappings, 'AAAe;;AAEf;;ACAA;;KAEK');
		assert.equal(map.rangeMappings, 'A;;;;A;;');
	}
});
