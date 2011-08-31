var contract = require("../../../src/contract.js")(),
    should = require("should");

module.exports = function _bindContracts(object) {
    var ac = object.Account;

    var testAmount = function(amount) {
        should.exist(amount);
        amount.should.be.above(0);
    };

    ac.deposit = ac.deposit.pre(function(amount) {
        testAmount.call(this, amount);
    }).post(function (ret, amount) {
        should.not.exist(ret);
    }).invariant(function(before, amount) {
        this.balance.should.equal(before.balance + amount);
    });

    ac.withdraw = ac.withdraw.pre(function(amount) {
        testAmount.call(this, amount);
        amount.should.be.below(this.balance);
    }).post(function(ret, amount) {
        should.not.exist(ret);
    }).invariant(function (before, amount) {
        this.balance.should.equal(before.balance - amount);
    });

    ac.statement = ac.statement.pre(function() {
        arguments.should.be.empty;
    }).post(function(ret) {
        ret.should.equal(this.balance);
    }).invariant(function(before) {
        this.balance.should.equal(before.balance)
    });

    ac.transfer = ac.transfer.pre(function(ac, amount) {
        should.exist(ac);
        ac.should.have.property("deposit");
        testAmount.call(this, amount);
    }).post(function(ret) {
        should.not.exist(ret);
    });
};