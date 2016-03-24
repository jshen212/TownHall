TownHall.controller('chatCtrl', function($scope, $firebaseArray){
  $scope.chat = {};
  console.log("hi");
  $scope.messages = [];

  $scope.getMessages = function() {
    var boardId = sessionStorage.getItem('boardID');
    var boardMessagesRef = new Firebase('https://townhallapp.firebaseio.com/' + boardId);
    $scope.messages = $firebaseArray(boardMessagesRef);
    console.log($scope.messages);
  };

  $scope.getMessages();

  $scope.sendMessage = function() {
    console.log('hi');
    var user = localStorage.getItem('userInfo');
    user = JSON.parse(user);
    var username = user.name;
    var boardId = sessionStorage.getItem('boardID');
    var boardMessagesRef = new Firebase('https://townhallapp.firebaseio.com/' + boardId);
    boardMessagesRef.push({name: username, message: $scope.chat.message});
    $scope.chat.message = "";
  };






});
