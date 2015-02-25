import Ember from 'ember';
import DS from 'ember-data';

export default DS.FirebaseAdapter.extend({
  firebase: Ember.computed.alias('config.firebase')
});
