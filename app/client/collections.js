/*
Local collections only on client side.
We use ethereum blockchain as a backend, so do not need to use Meteor server
 */
Accounts = new Mongo.Collection('accounts', {connection: null});
new PersistentMinimongo(Accounts);
