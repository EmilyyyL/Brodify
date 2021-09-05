// listen for auth status changes
auth.onAuthStateChanged(user => {
  const verifyEmailBanner = document.querySelectorAll('.verify-email-banner');
  if (user) {
    db.collection('guides').onSnapshot(snapshot => {
      setupGuides(snapshot.docs);
      setupUI(user);
    }, err => console.log(err.message));
    // check if user email is verified
    // if user is not verified, there is a banner asking the user to verify their email
    // or send a new verifcation email. 
    if (user.emailVerified) {
      // email is verified.
      console.log('email is verified')
      verifyEmailBanner.forEach(item => item.style.display = 'none');
    } else {
      // email is not verified.
      console.log('email is not verified')
      verifyEmailBanner.forEach(item => item.style.display = 'block');
      // resend email verification
      const resendEmailVerification = document.querySelector('#resend-email-verification');
      resendEmailVerification.addEventListener('click', (e) => {
        e.preventDefault();
        firebase.auth().currentUser.sendEmailVerification().then(function() {
          console.log('email sent')
          // Email sent.
        }).catch(function(error) {
          // An error happened.
          console.log('email not sent')
        });
      });
      const closeX = document.querySelector('#close-x');
      closeX.addEventListener('click', (e) => {
        e.preventDefault();
        verifyEmailBanner.forEach(item => item.style.display = 'none');
      });
    }
  } else {
    setupUI();
    setupGuides([]);
    verifyEmailBanner.forEach(item => item.style.display = 'none');
  }
});

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(cred => {
    return db.collection('users').doc(cred.user.uid).set({
      username: signupForm['signup-username'].value,
      pronouns: signupForm['signup-pronouns'].value,
      year: signupForm['signup-year'].value,
      courses: signupForm['signup-courses'].value,
      emailVerified: false
    }, {merge:true});
  }).then(() => {
    // send email verification
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      // Email sent.
    }).catch(function(error) {
      // An error happened.
    });
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-signup');
    M.Modal.getInstance(modal).close();
    signupForm.reset();
  });
});

// logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    // close the login modal & reset form
    const modal = document.querySelector('#modal-login');
    M.Modal.getInstance(modal).close();
    loginForm.reset();
  });

});

// Forgot password
const forgotpasswordForm = document.querySelector('#forgot-password-form');
forgotpasswordForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = forgotpasswordForm['forgot-password-email'].value;

  auth.sendPasswordResetEmail(email).then(function() {
    // Email sent.
    console.log('Email Sent');
    // close the forgot password modal & reset form
    const modal = document.querySelector('#modal-forgot-password');
    M.Modal.getInstance(modal).close();
    forgotpasswordForm.reset();
  }).catch(function(error) {
    // An error happened.
  });
});

