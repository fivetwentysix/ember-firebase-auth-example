import Ember from 'ember';

export default Ember.Controller.extend({
  auth: Ember.computed.alias('config.auth'),
  email: Ember.computed.alias('auth.password.email'),

  loggedOut: Ember.computed.not('auth.token'),

  me: function() {
    return this.store.find('user', this.get('auth.uid'));
  }.property('auth.uid'),

  user: function() {
    return {
      email: this.get('email'),
      password: this.get('password')
    };
  }.property('email', 'password'),
  
  login: {
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
    if (user) { this._login(this.get('user')); }

    if (error) {
      this.set('error', error);
    }
  },

  actions: {
    createAccount: function() {
      this.config.firebase.createUser(this.get('user'), this.callback.bind(this));
    },

    login: function() {
      this._login(this.get('login'));
    },

    submitMyName: function() {
      var create = function() {
        this.store.createRecord('user', {
          id: this.get('config.auth.uid'),
          name: this.get('name')
        }).save();
      }.bind(this);

      var update = function(user) {
        user.set('name', this.get('name'));
        user.save();
      }.bind(this);

      this.store.find('user', this.get('auth.uid')).then(update, create);
    }
  }
});
