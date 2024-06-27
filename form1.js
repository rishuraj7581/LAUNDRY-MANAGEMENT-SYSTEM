// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to Firebase database
const db = firebase.database();

// Function to register user
function registerUser(phone, name, email, password) {
  // Check if the user already exists in the database
  db.ref('users/' + phone).once('value')
    .then((snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        // User already exists
        console.log("User already exists with phone number:", phone);
      } else {
        // User does not exist, proceed with registration
        db.ref('users/' + phone).set({
          name: name,
          email: email,
          password: password
        }).then(() => {
          console.log("User registered successfully");
        }).catch((error) => {
          console.error("Error registering user:", error);
        });
      }
    }).catch((error) => {
      console.error("Error checking user existence:", error);
    });
}

// Function to login user
function loginUser(phone) {
  // Check if the user exists in the database
  db.ref('users/' + phone).once('value')
    .then((snapshot) => {
      const userData = snapshot.val();
      if (userData) {
        // User exists, print user data
        console.log("User data:", userData);
      } else {
        // User does not exist
        console.log("User not found with phone number:", phone);
      }
    }).catch((error) => {
      console.error("Error fetching user data:", error);
    });
}

// Function to open login form
function openLogform() {
  document.getElementById("login").style.display = "block";
}

// Function to close login form
function closeLogform() {
  document.getElementById("login").style.display = "none";
}

// Function to open signup form
function openSignform() {
  document.getElementById("signup").style.display = "block";
}

// Function to close signup form
function closeSignform() {
  document.getElementById("signup").style.display = "none";
}

// Event listener for registration form submission
document.getElementById("signup").addEventListener("submit", function(event) {
  event.preventDefault();
  const phone = document.getElementById("signup").querySelector('input[name="phone"]').value;
  const name = document.getElementById("signup").querySelector('input[name="name"]').value;
  const email = document.getElementById("signup").querySelector('input[name="email"]').value;
  const password = document.getElementById("signup").querySelector('.signUppassword-input').value;
  const confirmPassword = document.getElementById("signup").querySelector('.confirm_password-input').value;

  if (password !== confirmPassword) {
    document.querySelector('.error-message').innerText = "Passwords do not match";
    return;
  }

  // Register the user
  registerUser(phone, name, email, password);
});

// Event listener for login form submission
document.getElementById("login").addEventListener("submit", function(event) {
  event.preventDefault();
  const phone = document.getElementById("login").querySelector('input[name="phone"]').value;

  // Login the user
  loginUser(phone);
});
