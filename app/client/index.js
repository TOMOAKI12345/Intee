// var psgeth = KNOONEIoajsd

// disconnect any meteor server
if(location.host !== 'localhost:3000' && location.host !== '127.0.0.1:3000')
    Meteor.disconnect();


// Set the default unit to ether
if(!LocalStore.get('etherUnit'))
    LocalStore.set('etherUnit', 'ether');


// Set Session default values for components
if (Meteor.isClient) {
    Session.setDefault('connected', false);
    Session.setDefault('balance', 0);
    Session.setDefault('blockNumber', 0);
    Session.setDefault('savingPointAddress', '0x02efa6fa829576670aaf5e7da244aecd6a803379');
    Session.setDefault("providerHost", "localhost");
    Session.setDefault("providerPort", "8080");
    Session.setDefault("account", 0);
    Session.setDefault("currentContractAddress", "");
    Session.setDefault("contractName", "");
    Session.setDefault("contractAbi", []);
    Session.setDefault("contractMethods", []);
    Session.setDefault("contractBalance", 0);
    Session.setDefault('contractBytes', 0);
}

Meteor.startup(function() {

    // SET default language
    if(Cookie.get('TAPi18next')) {
        TAPi18n.setLanguage(Cookie.get('TAPi18next'));
    } else {
        var userLang = navigator.language || navigator.userLanguage,
        availLang = TAPi18n.getLanguages();

        // set default language
        if (_.isObject(availLang) && availLang[userLang]) {
            TAPi18n.setLanguage(userLang);
            // lang = userLang;
        } else if (_.isObject(availLang) && availLang[userLang.substr(0,2)]) {
            TAPi18n.setLanguage(userLang.substr(0,2));
            // lang = userLang.substr(0,2);
        } else {
            TAPi18n.setLanguage('en');
            // lang = 'en';
        }
    }

    Tracker.autorun(function(){
        if(_.isString(TAPi18n.getLanguage())) {
            moment.locale(TAPi18n.getLanguage().substr(0,2));
            numeral.language(TAPi18n.getLanguage().substr(0,2));
        }
    });

	// Set Meta Title
	Meta.setTitle(TAPi18n.__("dapp.app.title"));
});
