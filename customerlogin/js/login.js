let globalEmail = "";

function login() {
  console.log('Attempting to login user ...')
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;
  const auth = firebase.auth();
  const promise = auth.signInWithEmailAndPassword(userEmail, userPass);
  promise.then((response) => {
    globalEmail = response.user.email;
    // Redirect to index.html after successful login
    window.location.href = '../../creaseart_website-master/index.html';
  });
  promise.catch((err) => errorNotification(err.message));
}
