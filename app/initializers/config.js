/* globals Firebase, Ember */

var config = Ember.Object.extend({
  auth: Ember.computed(function() {
    return this.firebase.getAuth();
  }),
  firebase: new Firebase("https://<your app>.firebaseio.com")
});

export function initialize(container, application) {
  application.register('config:main', config, { singleton: true });
  application.inject('adapter', 'config', 'config:main');
  application.inject('controller', 'config', 'config:main');
}

export default {
  name: 'config',
  initialize: initialize
};
