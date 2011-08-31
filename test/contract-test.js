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
		.vow.it.should.be.a("function")
		.partial("contains pre")
		.partial("contains post")
		.partial("contains invariant")

.batch()

	.context("contract(f).pre(g) ")
		.topic.is(function() {
			var promise = ev();

			var c = contract(function(a, b) {
				return a;
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
		.vow.it.should.be.a("function")
		.context("when called (1)")
			.topic.is.an.invocation(1)
			.vow.it.should.error
			.vow.it.should.have
				.property("message", "expected undefined to exist")
			.parent()
		.context("when called (1,2)")
			.topic.is.an.invocation(1,2)
			.vow.it.should.error
			.vow.it.should.have
				.property("message", "expected 2 to be a string")
			.parent()
		.context("when called (1, 'foo')")
			.topic.is.an.invocation(1, 'foo')
			.vow.it.should.error
			.vow.it.should.have
				.property("message", "expected 1 to be above 5")
			.parent()
		.context("when called (6, 'foo')")
			.topic.is.an.invocation(6, 'foo')
			.vow.it.should.not.error
			.vow.it.should.equal(6)
			.suite()

.batch()
	
	.context("contract(f).post(g) ")
		.topic.is(function() {
			var promise = ev();

			var c = contract(function(a, b) {
				return a;
			})
			c = c.post(function(ret, a, b) {
				console.log(arguments);
				ret.should.equal(b)
			});

			return c.valueOf();
		})
		.vow.it.should.be.a("function")
		.context("when called (5, 6)")
			.topic.is.an.invocation(5, 6)
			.vow.it.should.error
			.vow.it.should.have
				.property("message", "expected 5 to equal 6")
			.parent()
		.context("when called (5, 5)")
			.topic.is.an.invocation(5, 5)
			.vow.it.should.not.error
			.vow.it.should.equal(5)
			.parent()
			

				
.suite();

	
if (module.parent) {
	suite["export"](module);
} else {
	suite.run({
		reporter: is.reporter
	}, function() {
		is.end();
	});	
}

	