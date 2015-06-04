/**
 Template Controllers

 @module Templates
 */

/**
 The statse template

 @class [template] views_statse
 @constructor
 */

Template['views_stats'].helpers({
    /**
     Get the name

     @method (name)
     */

    'name': function(){
        return this.name || TAPi18n.__('dapp.stats.defaultName');
    }
});

Template['views_stats'].created = function(){
    Meta.setSuffix(TAPi18n.__("dapp.stats.title"));
};
