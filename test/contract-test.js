var is = require("vows-is"),
	_should = is.should,
	EventEmitter = require("events").EventEmitter.prototype;

var ev = function() { return Object.create(EventEmitter); };

var contract = require("../src/contract.js")();

is.partial("contains pre", function _partial(context) {
	return context
		.context("contains pre which")
			.topic.is(function(c) { return c.pre; })
			.vow.it.should.be.a("function")
			.parent();
});

is.partial("contains post", function _partial(context) {
	return context
		.context("contains post which")
			.topic.is(function(c) { return c.post; })
			.vow.it.should.be.a("function")
			.parent();
});

is.partial("contains invariant", function _partial(context) {
	return context
		.context("contains invariant which")
			.topic.is(function(c) { return c.invariant; })
			.vow.it.should.be.a("function")
			.parent();
});

var suite = is.suite("contract").batch()
	
	.context("the contract function")
		.topic.is(function() { return contract; })
		.vow.it.should.be.a("function")
		.partial("contains pre")
		.partial("contains post")
		.partial("contains invariant")
		.context("when called returns an object which")
			.topic.is(function(c) { return c(function() { }); })
			.vow.it.should.be.a("object")
			.partial("contains pre")
			.partial("contains post")
			.partial("contains invariant")
		
.batch()

	.context("the function prototype")
		.topic.is(function() { return Function.prototype; })
		.partial("contains pre")
		.partial("contains post")
		.partial("contains invariant")

.batch()

	.context("contract(f).pre(g) ")
		.topic.is(function() {
			console.log("called");
			var promise = ev();

			var c = contract(function(a, b) {
				
			});
			c = c.pre(function(a,b) {
				_should.exist(a);
				a.should.be.a("number");
				_should.exist(b);
				b.should.be.a("string");
				a.should.be.above(5).and.below(10);
			});

			return c.valueOf();
		})
		.context("when called (1)")
			.topic.is.an.invocation(1)
			.vow.it.should.error
			.suite()
				


	
if (module.parent) {
	suite["export"](module);
} else {
	suite.run({
		reporter: is.reporter
	}, function() {
		is.end();
	});	
}

	