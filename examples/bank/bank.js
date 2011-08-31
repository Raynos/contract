var Account = {
    deposit: function(money) {
        this.balance += money;
    },
    withdraw: function(money) {
        this.balance -= money;
    },
    transfer: function(ac, money) {
        this.withdraw(money);
        ac.deposit(money);
    },
    statement: function() {
        return this.balance;
    }
};

module.exports = exports = function _createAccount(balance) {
    var ac = Object.create(Account);
    ac.balance = balance;
    return ac;
};

exports.Account = Account;

/* if (process.env.code_contracts) { */
require("./contracts/bank.js")(module.exports);
/* } */

//
// Tests it does something sensible
//

var a1 = exports(100);
var a2 = exports(100);

try {
    a1.deposit(-10);
} catch (e) {
    console.log(e.message);
}

a2.deposit(40);

try {
    a1.transfer(a2, 200);    
} catch (e) {
    console.log(e.message);
}

try {
    a2.statement(42);
} catch (e) {
    console.log(e.message);
}

console.log(a2.statement());
