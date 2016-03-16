var knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'mysqlcluster6.registeredsite.com',
    user: 'townhalladmin',
    password: '!Qaz2wsx',
    database: 'townhallthesis',
    charset: 'utf8'
  }
});

var Bookshelf = require('bookshelf')(knex);
var db = Bookshelf;

knex.schema.hasTable('Users').then(function(exists) {
  if (!exists) {
    knex.schema.createTable('Users', function(table) {
      table.increments('id').primary();
      table.string('email', 100).unique();
      table.string('firstname', 100);
      table.string('lastname', 100);
      table.string('image', 2000).defaultTo('https://about.udemy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png');
      table.string('uid', 100);
      table.timestamps();
    }).then(function(table) {
      console.log('Created Table', table);
    });
  }
});

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

module.exports = {
  db: db,
  knex: knex
};

// knex.schema.hasTable('Lists').then(function(exists) {
//   if (!exists) {
//     knex.schema.createTable('Lists', function(table) {
//       table.increments('id').primary();
//       table.string('list_title');
//       table.timestamps();
//     }).then(function(table) {
//       console.log('Created Table', table);
//     });
//   }
// });
//
// knex.schema.hasTable('Cards').then(function(exists) {
//   if (!exists) {
//     knex.schema.createTable('Cards', function(table) {
//       table.increments('id').primary();
//       table.string('card_text');
//       table.timestamps();
//     }).then(function(table) {
//       console.log('Created Table', table);
//     });
//   }
// });
//
// knex.schema.hasTable('Comments').then(function(exists) {
//   if (!exists) {
//     knex.schema.createTable('Comments', function(table) {
//       table.increments('id').primary();
//       table.string('comment_text');
//       table.string('attachments');
//       table.integer('created_by').unsigned();
//       table.foreign('created_by').references('id').inTable('Users');
//       table.timestamps();
//     }).then(function(table) {
//       console.log('Created Table', table);
//     });
//   }
// });


// knex.schema.hasTable('Boardlistjoin').then(function(exists) {
//   if (!exists) {
//     knex.schema.createTable('Boardlistjoin', function(table) {
//       table.integer('list_id').unsigned();
//       table.integer('board_id').unsigned();
//       table.foreign('list_id').references('id').inTable('Lists');
//       table.foreign('board_id').references('id').inTable('Boards');
//       table.timestamps();
//     }).then(function(table) {
//       console.log('Created Table', table);
//     });
//   }
// });
//
// knex.schema.hasTable('Listcardjoin').then(function(exists) {
//   if (!exists) {
//     knex.schema.createTable('Joined', function(table) {
//       table.integer('list_id').unsigned();
//       table.integer('card_id').unsigned();
//       table.foreign('list_id').references('id').inTable('Lists');
//       table.foreign('card_id').references('id').inTable('Cards');
//       table.timestamps();
//     }).then(function(table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// knex.schema.hasTable('Cardcommentjoin').then(function(exists) {
//   if (!exists) {
//     knex.schema.createTable('Cardcommentjoin', function(table) {
//       table.integer('card_id').unsigned();
//       table.integer('comment_id').unsigned();
//       table.foreign('card_id').references('id').inTable('Cards');
//       table.foreign('comment_id').references('id').inTable('Comments');
//       table.timestamps();
//     }).then(function(table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// Board:
// {
//   id: 1,
//   createdBy: {uid: 1, fullname: 'Daniel Kim'},
//   boardName: 'Bachelor Party',
//   members: [{uid: 1, fullName: 'Daniel Kim'},{uid: 3, fullname: 'Jeff Shen'},{member},{member}],
//   columns: [{ columnTitle: 'Backlog', cards: [{text: 'party at Johns house', attachments: 'http://example.com'}, {card}, {card}] }, {column}, {column}]
// }
