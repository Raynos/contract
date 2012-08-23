[![build status](https://secure.travis-ci.org/Raynos/contract.png)](http://travis-ci.org/Raynos/contract)
# contracts <a name="contracts" href="#contracts"><small><sup>link</sup></small></a>

A small library to cleanly implement [design by contract][1].

## Status: beta

Motivation :

	var f = function(a, b) {
		return a + b;
	}

	var f = f.pre(function(a, b) {
		a.should.be.a("number").and.above(0);
		b.should.be.a("number").and.above(0);
	}).post(function(ret, a, b) {
		ret.should.be.equal(a + b);
	});

It is recommended you only use contracts as part of unit tests or in development. contracts run at run-time and therefore negatively impact run-time performance.

## Examples: <a name="Examples" href="#Examples"><small><sup>link</sup></small></a>

See [the examples folder][2]

## Documentation: <a name="Documentation" href="#Documentation"><small><sup>link</sup></small></a>

See [the annotated source code][3]

### Method invocation: <a name="Method_invocation" href="#Method_invocation"><small><sup>link</sup></small></a>

The contract methods can be invoked in three different ways.

 - `f = f.pre(pre_cb);`
 - `f = contract(f).pre(pre_cb).valueOf();`
 - `f = contract.pre(pre_cb, f);`

### contract <a name="_contract" href="#_contract"><small><sup>link</sup></small></a>

options is hash that can be passed various values:

 - `"natives"` : default is `true`, if true it will extend `Function.prototype`

    var contract = require("contract")(options)

### contract.pre <a name="contract.pre" href="#contract.pre"><small><sup>link</sup></small></a>

`pre` allows you to assign a pre contract. Here you can assert that the arguments the function is invoked with should pass certain conditions.

The pre contract will be invoked before the function is invoked.

    f = contract.pre(function(arg1, arg2, arg3, ...) {
        // assert things about the arguments
    }, f)

### contract.post <a name="contract.post" href="#contract.post"><small><sup>link</sup></small></a>

`post` allows you to assign a post contract. Here you can assert that the return value matches certain conditions.

The post contract will be invoked after the function is invoked

    f = contract.post(function(retValue, arg1, arg2, arg3, ...) {
        // assert things about the return value
    }, f);

### contract.invariant <a name="contract.invariant" href="#contract.invariant"><small><sup>link</sup></small></a>

`invariant` allows you to assign a invariant contract. Here you can assert that there are no unexpected side effects during the function call.

The invariant contract will be invoked after the function is invoked

    o.f = contract.invariant(function(before, arg1, arg2, arg3, ...) {
        // `before` is the state of `this` before the function was called
        // `this` is the current state of `this`
    });

  [1]: http://en.wikipedia.org/wiki/Design_by_contract
  [2]: https://github.com/Raynos/contract/tree/master/examples
  [3]: http://raynos.github.com/contract/docs/contract.html