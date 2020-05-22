const sax = require('sax');
const loaderUtils = require('loader-utils');

exports.default = function (content) {
	this.cacheable && this.cacheable();
	const callback = this.async();
	const options = loaderUtils.getOptions(this) || {};
	const parser = sax.parser(false, { lowercase: true });
	parser.onend = async function () {
		try {
			await callback(null, `${content}${options.wxml || ''}`);
		}
		catch (err) {
			await callback(err, content);
		}
	};
	parser.write(content).close();
};

