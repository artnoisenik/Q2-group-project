var knex = require('./knex');

module.exports = function(first, last, email, password, phone, portrait_link, address1, address2, city, state, zip, lat, long, facebook) {
  return knex('users').insert({
      first_name: first,
      last_name: last,
      email: email,
      password: password,
      phone: phone,
      portrait_link: portrait_link,
      address_1: address1,
      address_2: address2,
      city: city,
      state: state,
      zip_code: zip,
      latitude: lat,
      longitude: long,
      facebook_id: facebook,
      admin: false,
      verified: false
    }).returning('id')
    .then(function(user) {
      return knex('ratings').insert({ reciever_id: user[0] }).returning('reciever_id')
    }).then(function(id) {
      return knex('users').where({ id: id[0] }).first()
    })
};
