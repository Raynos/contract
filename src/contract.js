var Contract = {
	"pre": function _pre(pre, f) {
		var g = function _wrapped() {
			pre.apply(this, arguments);
			return f.apply(this, arguments);
		};

		if (this._wrapped) {
			f = this._wrapped;
			this._wrapped = g;
			return this;
		} else if (arguments.length === 1) {
			f = this;
			return g;
		} else {
			return g;
		}
	},
	"post": function _post() {
		
	},
	"invariant": function _invariant() {
		
	},
	"valueOf": function _valueOf() {
		return this._wrapped;
	}
};

var	defaults = {
	natives: true
};

module.exports = function(options) {
	Object.keys(defaults).forEach(function(key) {
		if (options && options[key]) {
			defaults[key] = options[key];
		}
	});

	if (defaults.natives) {
		defineProperties(Function.prototype)
	}

	return function _create(f) {
		var c = Object.create(Contract);
		c._wrapped = f;
		return c;
	};
};

defineProperties(module.exports);

function defineProperties(obj) {
	Object.defineProperties(obj, {
		"pre": {
			value: Contract.pre,
			configurable: true
		},
		"post": {
			value: Contract.post,
			configurable: true
		},
		"invariant": {
			value: Contract.invariant,
			configurable: true
		}
	});
}