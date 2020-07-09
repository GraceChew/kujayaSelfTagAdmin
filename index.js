var firebaseConfig = {
    apiKey: "AIzaSyBooFcOHj7Y_aY23YIF_E9sVODxvBUxjqM",
    authDomain: "kujaya-attendance.firebaseapp.com",
    databaseURL: "https://kujaya-attendance.firebaseio.com",
    projectId: "kujaya-attendance",
    storageBucket: "kujaya-attendance.appspot.com",
    messagingSenderId: "484295354381",
    appId: "1:484295354381:web:6e2a1e8226860734c18d44",
    measurementId: "G-ZFVL3T98D1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  //firebase.analytics();
  firebase.auth.Auth.Persistence.LOCAL;

  $("#btn-login").click(function(){
   isLogin();
  });

  function isLogout(){
    firebase.auth().signOut();
  }

  function isLogin(){
    var email = $("#phone").val() + "@kujaya.com";
    var password = "password";

    if (email != "" & password != "")
    {
        var result = firebase.auth().signInWithEmailAndPassword(email, password);

        result.catch(function(error){
            var errorCode = error.code;
            var errorMessage = error.message;

            window.alert("Messaage : " + errorMessage); 
        });
    }
    else{
        window.alert("Please fill out all fields");
    }
  }

  $("#btn-logout").click(function(){
    
    isLogout();

  });

  $("#btn-update").click(function(){
    var candidateName = $("#candiateName").val();
    var candiateIC = $("#candidateIC").val();
    var candidateAgent = $("#candidateAgent").val();
    var candidateCompany = $("#candidateCompany").val();
    var candidatePhone = $("#candidatePhone").val();
    var candidateTransport = $("#candidateTransport").val();

    var rootRef = firebase.database().ref().child("candidates");
    var userID = firebase.auth().currentUser.uid;
    var userRef = rootRef.child(userID);

    var candidate = {
      "candidateName": candidateName,
      "candiateIC": candiateIC,
      "candidateAgent": candidateAgent,
      "candidateCompany": candidateCompany,
      "candidatePhone": candidatePhone,
      "candidateTransport": candidateTransport
    }

    userRef.set(candidate, function(error){

      if(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Messaage : " + errorMessage); 
      }
      else{
        window.alert("Success add candidate "); 
        $("#candidateForm")[0].reset();
      }

    });

  });