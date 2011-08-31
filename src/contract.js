// # [Github Repo](https://github.com/Raynos/contract)
// The contract object.
var Contract = {
	// A method that generates a function which will wrap the function and
	// call the pre condition with (arg1, arg2, ...)
    "_constructPre": function _constructPre(f, pre) {
        return function _wrapped() {
            pre.apply(this, arguments);
            return f.apply(this, arguments);
        };
    },
    // handle multiple APIs. Pass the function & pre conditions into constructPre
    "pre": function _pre(pre, f) {
        return this._handleMultipleAPIs(f, pre, "_constructPre");
    },
    // A method that generates a function which will wrap the function and 
    // call the post condition with (ret, arg1, arg2, ...)
    "_constructPost": function _constructPost(f, post) {
        return function _wrapped() {
            var arr = [f.apply(this, arguments)];
            post.apply(this, arr.concat.apply(arr, arguments));
            return arr[0];
        }
    },
    // Handle multiple APIs. Either this was wrapped `construct(f).pre(pre)` or
    // This was called from the function prototype `f.pre(pre)` or this was 
    // called from the Construct object `Construct.pre(pre, f)` 
    "_handleMultipleAPIs": function _handleMultipleAPIs(f, obj, method) {
        if (this._wrapped) {
            f = this._wrapped;
            this._wrapped = this[method](f, obj);
            return this;
        } else if (arguments.length === 1) {
            f = this;
            return this[method](f, obj);
        } else {
            return this[method](f, obj);
        }
    },
    // handle multiple APIs. Pass the function & post condition into constructPost
    "post": function _post(post, f) {
        return this._handleMultipleAPIs(f, post, "_constructPost");
    },
    // un-implemented TODO
	"invariant": function _invariant() {
		
	},
	// unwrap the Constructo object
	"valueOf": function _valueOf() {
		return this._wrapped;
	}
};

// defaults object. By default inject into Function.prototype
var	defaults = {
	natives: true
};

// ContractFactory generates a new Contract based on the passed function `f`
var ContractFactory = function _create(f) {
	var c = Object.create(Contract);
	c._wrapped = f;
	return c;
}

// contract = require("constract");
// Sets up the contract object basedon the options.
// If `natives === true` inject the methods into Function.prototype.
module.exports = function(options) {
	Object.keys(defaults).forEach(function(key) {
		if (options && options[key]) {
			defaults[key] = options[key];
		}
	});

	if (defaults.natives) {
		defineProperties(Function.prototype)
	}

	return ContractFactory;
};

// define the properties on `ContractFactory`
defineProperties(ContractFactory);

// Define the pre, post & invariant objects onto an object.
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