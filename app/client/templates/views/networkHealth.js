/**
 Template Controllers

 @module Templates
 */

/**
 The network health template

 @class [template] views_view1
 @constructor
 */

Template['views_networkHealth'].helpers({
    /**
     Get the name

     @method (name)
     */

    'name': function(){
        return this.name || TAPi18n.__('dapp.networkHealth.defaultName');
    }
});

Template['views_networkHealth'].created = function(){
    Meta.setSuffix(TAPi18n.__("dapp.networkHealth.title"));
};
