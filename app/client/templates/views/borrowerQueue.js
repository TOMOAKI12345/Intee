/**
 Template Controllers

 @module Templates
 */

/**
 The Borrower Queue template

 @class [template] views_borrowerQueue
 @constructor
 */

Template['views_borrowerQueue'].helpers({
    /**
     Get the name

     @method (name)
     */

    'name': function(){
        return this.name || TAPi18n.__('dapp.borrowerQueue.defaultName');
    }
});

Template['views_borrowerQueue'].created = function(){
    Meta.setSuffix(TAPi18n.__("dapp.borrowerQueue.title"));
};
