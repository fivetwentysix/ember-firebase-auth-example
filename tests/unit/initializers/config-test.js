import Ember from 'ember';
import { initialize } from '../../../initializers/config';
import { module, test } from 'qunit';

var container, application;

module('DatabaseInitializer', {
  beforeEach: function() {
    Ember.run(function() {
      application = Ember.Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

test('expect firebase accessible from models', function(assert) {
  initialize(container, application);
  assert.ok(container);
});
