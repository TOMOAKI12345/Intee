/**
 Template Controllers

 @module Templates
 */

/**
 The Borrower Queue template

 @class [template] views_borrow
 @constructor
 */

Template['views_borrow'].helpers({
    /**
     Get the name

     @method (name)
     */

    'name': function(){
        return this.name || TAPi18n.__('dapp.borrow.defaultName');
    }
});

Template['views_borrow'].created = function(){
    Meta.setSuffix(TAPi18n.__("dapp.borrow.title"));
};
