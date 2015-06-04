/**
 Template Controllers

 @module Templates
 */

/**
 The SP balance template

 @class [template] components_spBalance
 @constructor
 */

Template['components_spBalance'].helpers({
    /**
     Get The Original Balance

     @method (watchBalance)
     */

    'watchBalance': function(){
        return web3.fromWei(Session.get('spBalance'), LocalStore.get('etherUnit')).toString(10);
    },
});

//_.extend(Template['components_spBalance'], {
//    /**
//     On Template Created
//
//     @method (created)
//     */
//
//     // get balance of saving points.
//    'created': function() {
//        var coinbase = web3.eth.coinbase;
//        this.updateBalance = Meteor.setInterval(function() {
//            web3.eth.getBalance(coinbase, function(err, result){
//                Session.set("spBalance", String(result));
//            });
//        }, 1 * 1000);
//    },
//                Session.set('multiplyResult', String(err));
//        }); // Call Contract and Multply Given Value
//    },
//    /**
//     On Template Destroyed
//
//     @method (destroyed)
//     */
//
//    'destroyed': function() {
//        Meteor.clearInterval(this.updateBalance);
//    }
//});
