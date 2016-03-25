TownHall.controller('chatCtrl', function($scope, $firebaseArray){
  $scope.chat = {};
  console.log("hi");
  $scope.messages = [];
  $scope.user = JSON.parse(localStorage.getItem('userInfo'));
  $scope.username = $scope.user.name;
  $scope.userUID = $scope.user.id;
  console.log('++line 7 chatController user = ', $scope.user);
  console.log('++line 8 chatController username = ', $scope.username);
  console.log('++line 7 chatController userUID = ', $scope.user.uid);



  $scope.getMessages = function() {
    var boardId = sessionStorage.getItem('boardID');
    var boardMessagesRef = new Firebase('https://townhallapp.firebaseio.com/' + boardId);
    $scope.messages = $firebaseArray(boardMessagesRef);
    console.log('++++++++++++++++', $scope.messages);
  };

  $scope.getMessages();

  $scope.sendMessage = function() {
    console.log('hi');
    var user = localStorage.getItem('userInfo');
    user = JSON.parse(user);
    var username = user.name;
    var userId = user.id;
    var boardId = sessionStorage.getItem('boardID');
    var boardMessagesRef = new Firebase('https://townhallapp.firebaseio.com/' + boardId);
    boardMessagesRef.push({name: username, message: $scope.chat.message, userId: userId});
    $scope.chat.message = "";
  };






});
