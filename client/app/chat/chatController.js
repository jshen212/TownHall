TownHall.controller('chatCtrl', function($scope, $firebaseArray) {
  $scope.chat = {};
  $scope.messages = [];
  $scope.user = JSON.parse(localStorage.getItem('userInfo'));
  $scope.username = $scope.user.name;
  $scope.userUID = $scope.user.id;

  // fetches the boardID from the session storage
  $scope.getMessages = function() {
    var boardId = sessionStorage.getItem('boardID');
    // creates a unique firebase instance with the boardId
    var boardMessagesRef = new Firebase('https://townhallapp.firebaseio.com/' + boardId);
    // creates an array of messages
    $scope.messages = $firebaseArray(boardMessagesRef);
  };

  // fetches all messages upon page load
  $scope.getMessages();

  // gets a user's info from local storage and boardId from session storage
  // then creates a firebase instance that stores all messages related to that boardId
  $scope.sendMessage = function() {
    var user = localStorage.getItem('userInfo');
    user = JSON.parse(user);
    var username = user.name;
    var userId = user.id;
    var boardId = sessionStorage.getItem('boardID');
    // creates a firebase instance with the board's unique id
    var boardMessagesRef = new Firebase('https://townhallapp.firebaseio.com/' + boardId);
    // adds the message to the board's messages array
    boardMessagesRef.push({name: username, message: $scope.chat.message, userId: userId});
    // resets the message to empty
    $scope.chat.message = "";
  };
});
