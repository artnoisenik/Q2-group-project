var express = require('express');
var router = express.Router();
var knex = require('../lib/knex');
var queries = require('../lib');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/post', function(req, res, next){
  res.render('newposting', { title: 'Lact2Go' });
})

router.post('/post', function(req, res, next){
  knex('listings')
  .insert({
    // 'user_id':CookieSession.id
    'title':req.body.title,
    'post_end':req.body.post_end,
    'amount':req.body.amount,
    'cost_per_ounce':req.body.cost_per_ounce,
    'description':req.body.description
  })
  .then(function(response) {
    res.render('newposting', {title: 'Lact2Go', success: 'Post added'});
  });
})

router.get('/post/edit/:id', function(req, res, next){
  knex('listings')
  .where('id', req.params.id).first()
  .then(function(post){
    console.log(post);
    res.render('editposting', {title: 'Lact2Go', post:post})

  })
})

router.post('/post/edit/:id', function(req, res, next){
  knex('listings')
    .where('id', req.params.id).first()
    .returning('id')
    .update({
    'title':req.body.title,
    'post_end':req.body.post_end,
    'amount':req.body.amount,
    'cost_per_ounce':req.body.cost_per_ounce,
    'description':req.body.description
  })
  .then(function(post_id) {
    res.redirect(302, '/users/post/edit/' + post_id);
  });
})

router.get('/profile/:id', function(req, res, next) {
  knex('listings')
    .where('user_id', req.params.id)
    .select('created_at', 'portrait_link', 'title', 'amount', 'cost_per_ounce', 'description', 'requested', 'verified', 'user_id')
    .join('users', 'users.id', 'listings.user_id')
    .then(function(listings) {
      knex('users')
      .where('id', req.params.id)
      .select('portrait_link', 'email', 'address_1', 'address_2', 'city', 'state', 'zip_code', 'id')
        .then(function(user){
          res.render('profile', {
            title: 'Unlatched',
            listings: listings,
            user: user[0]
          });
        })
    });
});

router.post('/profile/:id', function(req, res, next){
  knex('users')
    .where('id', req.params.id).first()
    .returning('id')
    .update({
    'email':req.body.email,
    'portrait_link':req.body.portrait_link,
    'address_1':req.body.address_1,
    'address_2':req.body.address_2,
    'city':req.body.city,
    'state':req.body.state,
    'zip_code':req.body.zip_code
  })
  .then(function(profile_id) {
    res.redirect(302, '/users/profile/' + profile_id);
  });
})



module.exports = router;
