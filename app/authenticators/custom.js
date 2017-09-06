import Ember from 'ember';
import Base from 'ember-simple-auth/authenticators/base';
export default Base.extend({
    tokenEndpoint: 'http://localhost:3000/authenticate',
    restore: function(data) {
        return new Ember.RSVP.Promise(function(resolve, reject) {
            if (!Ember.isEmpty(data.token)) {
                resolve(data);
            } else {
                reject();
            }
        });
    },

    authenticate: function(email, pw) {
        return new Ember.RSVP.Promise((resolve, reject) => {

            Ember.$.ajax({
                url: this.tokenEndpoint,
                type: 'POST',
                data: JSON.stringify({
                    email: email,
                    password: pw
                }),
                contentType: 'application/vnd.api+json',
                headers: {
                  'Accept': 'application/vnd.api+json'
                },
                dataType: 'json'
            }).then(function(response) {
                Ember.run(function() {
                    resolve({
                        token: response.auth_token
                    });
                });
            }, function(xhr) {
                var response = xhr.responseText;
                Ember.run(function() {
                    reject(response);
                });
            });
        });
    },

    invalidate: function() {
        return Ember.RSVP.resolve();
    }
});
