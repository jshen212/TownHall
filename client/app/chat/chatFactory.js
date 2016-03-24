TownHall.factory('Chat', function($http, $firebaseArray, FirebaseUrl, $window, $state, $firebaseAuth) {


  var createChat = function(boardId) {
    var boardMessagesRef = new Firebase('https://townhallapp.firebaseio.com/' + boardId);
    // boardMessagesRef.push({name: "yo"});
  };

  return {
    createChat: createChat
  };


});
