var contract = require("../../../src/contract.js")(),
    should = require("should");

module.exports = function _bindContracts(object) {
    var ac = object.Account;

    ac.deposit = ac.deposit.pre(function(amount) {
        should.exist(amount);
        amount.should.be.above(0);
    }).post(function (ret, amount) {
        should.not.exist(ret);
    }).invariant(function(before, amount) {
        this.balance.should.equal(before.balance + amount);
    });

    ac.withdraw = ac.withdraw.pre(function(amount) {
        should.exist(amount);
        amount.should.be.above(0);
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
        ac.should.be.an.instanceof(object.Account);
        should.exist(amount);
        amount.should.be.above(0);
    })
};