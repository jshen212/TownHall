TownHall.controller('profileCtrl', function($scope, Auth, User, $state, dataFactory, profileFactory, $mdDialog, $mdSidenav) {
  // $scope.boards = [{board_id: 1, boardName: 'board1'}, {board_id: 3, boardName: 'board3'}, {board_id: 7, boardName: 'board7'}];
  $scope.boards = [];
  $scope.invitations = [];
  $scope.userName = '';
  $scope.userEmail = '';
  $scope.userImage = '';

  $scope.refreshProfile = function() {
    window.location.reload();
  };

  $scope.signout = function() {
    Auth.signout();
    $state.go('signin');
  };

  $scope.updateProfile = function(val) {
    var getAuth = Auth.getAuth();
    var user = {
      uid: getAuth.uid,
      name: val
    };
    profileFactory.updateProfile(user).then(function() {
      User.getUser(user, function(fetchedData) {
        var userInfo = JSON.stringify(fetchedData[0]);
        localStorage.setItem('userInfo', userInfo);
        $scope.userName = val;
      });
    });
  };

  $scope.loadBoard = function(board) {
    var boardID = board.board_id;
    sessionStorage.setItem('boardID', boardID);
    dataFactory.loadBoard(board, function(fetchedData) {
      $state.go('dashboard', {obj: fetchedData});
    });
  };

  $scope.openCreateBoardModal = function() {
    $mdDialog.show({
      clickOutsideToClose: true,
      locals: {loadBoard: $scope.loadBoard},
      templateUrl: 'app/profile/createBoardModal.html',
      controller: 'createBoardModalCtrl'
    });
  };

  $scope.setUserInfo = function(user) {
    $scope.userName = user.name;
    $scope.userEmail = user.email;
    $scope.userImage = user.image || 'https://about.udemy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';
  };

  $scope.getInvites = function(user) {
    profileFactory.getInvites(user).then(function(invitations) {
      invitations.forEach(function(invitation) {
        var user = {
          user_id: invitation.board_createdby
        };
        profileFactory.getUserName(user).then(function(fetchedData) {
          invitation.board_createdby = fetchedData;
        });
      });
      $scope.invitations = invitations;
    });
  };

  $scope.getBoards = function(user) {
    profileFactory.getBoards(user).then(function(boards) {
      var formattedBoards = boards.map(function(board) {
        return {
          board_id: board.id,
          boardName: board.board_title
        };
      });
      $scope.boards = formattedBoards;
    });
  };

  $scope.loadProfile = function() {
    var userID = localStorage.getItem('userInfo');
    var user = JSON.parse(userID);
    if (user) {
      $scope.setUserInfo(user);
      $scope.getInvites(user);
      $scope.getBoards(user);
    } else {
      var getAuth = Auth.getAuth();
      var uid = {
        uid: getAuth.uid
      };
      User.getUser(uid, function(fetchedData) {
        var userInfo = JSON.stringify(fetchedData[0]);
        localStorage.setItem('userInfo', userInfo);
        user = fetchedData[0];
        $scope.setUserInfo(user);
        $scope.getInvites(user);
        $scope.getBoards(user);
      });
    }
  };

  $scope.respondToInvite = function(boardID, index, response) {
    var user = JSON.parse(localStorage.getItem('userInfo'));
    var userID = user.id;
    $scope.invitations.splice(index, 1);
    profileFactory.inviteResponse({
      userId: userID,
      boardId: boardID,
      answer: response
    }).then(function() {
      $scope.getBoards(user);
    });
  };

});
