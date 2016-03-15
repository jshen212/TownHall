var mongoose = require('mongoose');

var boardSchema = new mongoose.Schema({
  id: Number,
  createdBy: {
    uid: String,
    firstname: String,
    lastname: String,
    email: String,
    image: String
  },
  boardName: String,
  boardMembers: [{
    uid: String,
    firstname: String,
    lastname: String,
    email: String,
    image: String
  }],
  lists: [{
    title: String,
    cards: [{
      text: String,
      comments: [{
        text: String,
        attachments: String
      }],
      attachments: String
    }]
  }]
});

module.exports = mongoose.model('Board', boardSchema);
