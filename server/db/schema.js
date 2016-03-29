var sql = require('../../config.js');

var knex = require('knex')({
  client: 'mysql',
  connection: sql.sql_server_connection
});

var Bookshelf = require('bookshelf')(knex);
var db = Bookshelf;

// creates a Users table
knex.schema.hasTable('Users').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('Users', function(table) {
      table.increments('id').primary();
      table.string('email', 100).unique();
      table.string('name', 100);
      table.string('image', 2000).defaultTo('https://about.udemy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png');
      table.string('uid', 100);
      table.timestamps();
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

// creates a Boards table
knex.schema.hasTable('Boards').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('Boards', function(table) {
      table.increments('id').primary();
      table.string('board_title', 100);
      table.integer('board_createdby');
      table.json('board_lists');
      table.timestamps();
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

// creates a Joined table that shows which users are part of which board
knex.schema.hasTable('Joined').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('Joined', function(table) {
      table.integer('user_id').unsigned();
      table.integer('board_id').unsigned();
      table.foreign('user_id').references('id').inTable('Users');
      table.foreign('board_id').references('id').inTable('Boards');
      table.timestamps();
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

// creates an Invitations table that shows which users have been invited to which boards, and what their response is (0 = pending, 1 = joined)
knex.schema.hasTable('Invitations').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('Invitations', function(table) {
      table.integer('user_id').unsigned();
      table.integer('board_id').unsigned();
      table.integer('response').defaultTo(0);
      table.foreign('user_id').references('id').inTable('Users');
      table.foreign('board_id').references('id').inTable('Boards');
      table.timestamps();
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = {
  db: db,
  knex: knex
};
