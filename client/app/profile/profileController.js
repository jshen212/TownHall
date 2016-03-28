TownHall.controller('profileCtrl', function($scope, Auth, User, $state, dataFactory, profileFactory, $mdDialog, $mdSidenav) {
  $scope.boards = [];
  $scope.invitations = [];
  $scope.userName = '';
  $scope.userEmail = '';
  $scope.userImage = '';

  // refreshes the profile page
  $scope.refreshProfile = function() {
    window.location.reload();
  };

  // deletes the user information from local storage and directs user to sign in page
  $scope.signout = function() {
    Auth.signout();
    $state.go('signin');
  };

  // updates the user's information in the database and in localStorage
  $scope.updateProfile = function(val) {
    var getAuth = Auth.getAuth();
    var user = {
      uid: getAuth.uid,
      name: val
    };
    // sends the user info to fetch the specific user's info from the Users table
    profileFactory.updateProfile(user).then(function() {
      User.getUser(user, function(fetchedData) {
        // updates the information in the database and the localStorage
        var userInfo = JSON.stringify(fetchedData[0]);
        localStorage.setItem('userInfo', userInfo);
        $scope.userName = val;
      });
    });
  };

  // loads the board that the user enters
  $scope.loadBoard = function(board) {
    // sets the boardID
    var boardID = board.board_id;
    // adds the boardID to the session storage
    sessionStorage.setItem('boardID', boardID);
    // fetches the board from the database
    dataFactory.loadBoard(board, function(fetchedData) {
      // directs the user to the dashboard and loads the specific board that the user entered
      $state.go('dashboard', {obj: fetchedData});
    });
  };

  // opens a modal that creates a new board
  $scope.openCreateBoardModal = function() {
    $mdDialog.show({
      clickOutsideToClose: true,
      locals: {loadBoard: $scope.loadBoard},
      templateUrl: 'app/profile/createBoardModal.html',
      controller: 'createBoardModalCtrl'
    });
  };

  // takes a user's information and stores it in the associated properties in the controller's scope
  $scope.setUserInfo = function(user) {
    $scope.userName = user.name;
    $scope.userEmail = user.email;
    $scope.userImage = user.image || 'https://about.udemy.com/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png';
  };

  // uses a user's information to retrieve all invites that the user has received
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

  // gets all the boards that a user is part of
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

  // uses the user's id to retrieve the user's data and loads that user's profile
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

  // responds to an invitation using the boardId and updates the response based on whether the user clicks join or deny
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
