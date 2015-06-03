/**
 Template Controllers

 @module Templates
 */

/**
 The savee template

 @class [template] views_savee
 @constructor
 */

Template['views_save'].helpers({
    /**
     Get the name

     @method (name)
     */

    'name': function(){
        return this.name || TAPi18n.__('dapp.save.defaultName');
    }
});

Template['views_save'].created = function(){
    Meta.setSuffix(TAPi18n.__("dapp.save.title"));
};
