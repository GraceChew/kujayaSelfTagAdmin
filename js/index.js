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

  var curday = function(sp){
    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //As January is 0.
    var yyyy = today.getFullYear();
    
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm; 
    return (yyyy+sp+mm+sp+dd);
    };

  function uploadToFirebase(name, ic, agent, company, phone, transport, currentPercent, len, recordNum){

    currentPercent = currentPercent + 1;
    if(currentPercent > 100){
       currentPercent = 100;
    }
    var rootRef = firebase.database().ref().child("candidates");
    var historyRef = firebase.database().ref().child("CandidateHistory");
    // var userID = firebase.auth().currentUser.uid;
    // var userRef = rootRef.child(userID);

    var candidate = {
      "candidateName": name,
      "candiateIC": ic,
      "candidateAgent": agent,
      "candidateCompany": company,
      "candidatePhone": phone,
      "candidateTransport": transport
    }

    rootRef.push(candidate, function(error){

      if(error){
        var errorCode = error.code;
        var errorMessage = error.message;

        $("#uploadResult").append('<li style="color: red;margin-bottom:5px;"><i class="fa fa-times" aria-hidden="true"></i></i>'+ name + ";" + ic + ";" + agent + ";" + company + ";" + phone + ";" + transport + ";" +'</li>');

        window.alert("Messaage : " + errorMessage); 
      }
      else{
        $("#uploadResult").append('<li style="color: green;margin-bottom:5px;"><i class="fa fa-check" aria-hidden="true"></i></i>'+ name + ";" + ic + ";" + agent + ";" + company + ";" + phone + ";" + transport + ";" + '</li>');
        var elem = document.getElementById("progressUpload");
        elem.style.width = currentPercent + "%";
        elem.innerHTML = currentPercent  + "%";

        var title = document.getElementById("titleUpload");
        title.innerHTML = recordNum + " of  Total " + len + " Is Upload."
        title.style.color = "green";
      }

    });

    var today = new Date();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()

    var history = {
      "candiateIC": ic,
      "changeBy": "Bulk Upload",
      "changeDate": curday('-'),
      "changeTime": time,
      "changeItem": "new account",
      "valueFrom": "-",
      "valueTo": ic + "/" + name + "/" + phone +"/"+transport+"/"+company
    }

    historyRef.push(history, function(error){
        if(error){
          var errorCode = error.code;
          var errorMessage = error.message;

          window.alert("Messaage : " + errorMessage); 
        }
      
      }
    );

  }

  $("#btn-update").click(function(){

    var companySelected = document.getElementById("candidateCompany");
    var transportSelected = document.getElementById("candidateTransport");

    var candidateName = $("#candiateName").val();
    var candiateIC = $("#candidateIC").val();
    var candidateAgent = $("#candidateAgent").val();
    var candidateCompany = companySelected.options[companySelected.selectedIndex].text;
    var candidatePhone = $("#candidatePhone").val();
    var candidateTransport = transportSelected.options[transportSelected.selectedIndex].text;

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
