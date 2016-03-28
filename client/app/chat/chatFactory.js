TownHall.factory('Chat', function($http, $firebaseArray, FirebaseUrl, $window, $state, $firebaseAuth) {

// creates a new firebase chat instance for a specific board
  var createChat = function(boardId) {
    var boardMessagesRef = new Firebase('https://townhallapp.firebaseio.com/' + boardId);
  };

  return {
    createChat: createChat
  };
});
