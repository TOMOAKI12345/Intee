/**
 Template Controllers

 @module Templates
 */

/**
 The myaccount template

 @class [template] views_myaccount
 @constructor
 */

Template['views_myaccount'].helpers({
    /**
     Get the name

     @method (name)
     */

    'name': function(){
        return this.name || TAPi18n.__('dapp.myaccount.defaultName');
    }
});

Template['views_myaccount'].created = function(){
    Meta.setSuffix(TAPi18n.__("dapp.myaccount.title"));
};
