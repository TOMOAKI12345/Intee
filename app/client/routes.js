/**
Template Controllers

@module Routes
*/

/**
The app routes

@class App routes
@constructor
*/

// Change the URLS to use #! instead of real paths
// Iron.Location.configure({useHashPaths: true});

// Router defaults
Router.configure({
    layoutTemplate: 'layout_main',
    notFoundTemplate: 'layout_notFound',
    yieldRegions: {
        'layout_header': {to: 'header'}
        , 'layout_footer': {to: 'footer'}
    }
});

// ROUTES

/**
The receive route, showing the wallet overview

@method dashboard
*/

Router.route('/', {
    template: 'views_borrowerQueue',
    name: 'home'
});

Router.route('/borrowerQueue', {
    template: 'views_borrowerQueue',
    name: 'borrowerQueue'
});

Router.route('/blacklist', {
    template: 'views_blacklist',
    name: 'blacklist'
});
Router.route('/borrow', {
    template: 'views_borrow',
    name: 'borrow'
});
Router.route('/save', {
    template: 'views_save',
    name: 'save'
});

Router.route('/stats', {
    template: 'views_stats',
    name: 'stats'
});
Router.route('/networkHealth', {
    template: 'views_networkHealth',
    name: 'networkHealth'
});
Router.route('/myaccount', {
    template: 'views_myaccount',
    name: 'myaccount'
});





