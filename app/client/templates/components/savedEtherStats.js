/**
 Template Controllers

 @module Templates
 */

/**
 The saved Ether stats template

 @class [template] components_savedEtherStats
 @constructor
 */

Template['components_SavedEtherStats'].helpers({
    /**
     Get The Original savedEtherStats

     @method (watchsavedEtherStats)
     */

    'watchsavedEtherStats': function(){
        return web3.fromWei(Session.get('savedEtherStats'), LocalStore.get('etherUnit')).toString(10);
    },
});

_.extend(Template['components_savedEtherStats'], {
    /**
     On Template Created

     @method (created)
     */

    'created': function() {
        var coinbase = web3.eth.coinbase;
        this.updateSavedEtherStats = Meteor.setInterval(function() {
            web3.eth.getsavedEtherStats(coinbase, function(err, result){
                Session.set("savedEtherStats", String(result));
            });
        }, 1 * 1000);
    },

    /**
     On Template Destroyed

     @method (destroyed)
     */

    'destroyed': function() {
        Meteor.clearInterval(this.updatesavedEtherStats);
    }
});
