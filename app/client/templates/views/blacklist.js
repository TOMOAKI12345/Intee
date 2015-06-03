/**
 Template Controllers

 @module Templates
 */

/**
 The Blacklisted blacklisters template

 @class [template] views_blacklist
 @constructor
 */

Template['views_blacklist'].helpers({
    /**
     Get the name

     @method (name)
     */

    'name': function(){
        return this.name || TAPi18n.__('dapp.blacklist.defaultName');
    }
});

Template['views_blacklist'].created = function(){
    Meta.setSuffix(TAPi18n.__("dapp.blacklist.title"));
};
