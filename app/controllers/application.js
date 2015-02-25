import Ember from 'ember';

export default Ember.Controller.extend({
  auth: Ember.computed.alias('config.auth'),
  email: Ember.computed.alias('auth.password.email'),

  loggedOut: Ember.computed.not('auth.token'),
  loggedIn: Ember.computed.not('loggedOut'),

  me: function() {
    var id = this.get('auth.uid');
    if (id) {
      return this.store.find('user', id);
    }
  }.property('auth.uid'),

  login: {
    email: '',
    password: ''
  },

  register: {
    email: '',
    password: ''
  },

  _login: function(user) {
    this.config.firebase.authWithPassword(user, function(error, authData) {
      if (error) {
        this.set('login.error', error);
      } else {
        this.set('config.auth', authData);
      }
    }.bind(this));
  },

  callback: function(error, user) {
    if (user) {
      this._login(this.get('register'));
      this.store.createRecord('user', {
        id: user.uid,
        created: new Date().getTime()
      }).save().then(function(user) {
        this.set('me', user);
      }.bind(this));
    }

    if (error) {
      this.set('error', error);
    }
  },

  actions: {
    createAccount: function() {
      this.config.firebase.createUser(this.get('register'), this.callback.bind(this));
    },

    login: function() {
      this._login(this.get('login'));
    },

    logout: function() {
      this.config.logout();
    },

    submitMyName: function() {
      var me = this.get('me');
      me.set('name', this.get('name'));
      me.save();
    }
  }
});
