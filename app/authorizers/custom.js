import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

const { service } = Ember.inject;

export default Base.extend({
  session: service('session'),

  authorize: function(jqXHR, block) {
      var accessToken = jqXHR.token;
      if (this.get('session.isAuthenticated') && !Ember.isEmpty(accessToken)) {
          block('Authorization', accessToken);
      }
  }
});
