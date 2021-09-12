// DOM elements
const accountDetails = document.querySelector('.account-details');
const accountSettings = document.querySelector('.account-settings');
const todoList = document.querySelector('.todolist');

const setupUI = (user) => {
  if (user) {
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div> Logged in as ${user.email}</div> <br>
        <div> <p class = "profile-headings"> Username </p> ${doc.data().username}</div> <br>
        <div> <p class = "profile-headings"> Pronouns </p>${doc.data().pronouns}</div> <br>
        <div> <p class = "profile-headings"> Year </p>${doc.data().year}</div> <br>
        <div> <p class = "profile-headings"> Courses </p>${doc.data().courses}</div> <br>
        <div><p class = "profile-headings"> Bio </p>${doc.data().bio}</div>
        <div><p class = "profile-headings"> Points </p>${doc.data().points}</div>
      `;
      accountDetails.innerHTML = html;

      const settingsHTML = `
        <div> 
          <p class="settings-headings">Username</p>
          <p class="settings-txt"> 
            ${doc.data().username} 
            <a href="#" class="settings-btn modal-trigger" data-target="modal-change-username">Change username</a>
          </p> 
        </div>
        <div> 
          <p class="settings-headings">Email</p>
          <p class="settings-txt">
            ${user.email} 
            <a href="#" class="settings-btn modal-trigger" data-target="modal-change-email">Change email</a>
          </p> 
        </div>
        <div> 
          <p class="settings-headings">Pronouns</p>
          <p class="settings-txt">
            ${doc.data().pronouns} 
            <a href="#" class="settings-btn modal-trigger" data-target="modal-change-pronouns">Change pronouns</a>
          </p> 
        </div>
        <div> 
          <p class="settings-headings">Year</p>
          <p class="settings-txt">
            ${doc.data().year} 
            <a href="#" class="settings-btn modal-trigger" data-target="modal-change-year">Change year</a>
          </p> 
        </div>
        <div> 
          <p class="settings-headings">Courses</p>
          <p class="settings-txt"> 
            ${doc.data().courses} 
            <a href="#" class="settings-btn modal-trigger" data-target="modal-change-courses">Change courses</a>
          </p> 
        </div>
        <div> 
          <p class="settings-headings">Bio</p>
          <p class="settings-txt"> 
            ${doc.data().bio} 
            <a href="#" class="settings-btn modal-trigger" data-target="modal-change-bio">Change Bio</a>
          </p> 
        </div>
      `;
      accountSettings.innerHTML = settingsHTML;
    });

    if (window.location.pathname == '/homepage.html') {
      // close settings
      const closeSettings = document.querySelector('#close-settings');
      closeSettings.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = document.querySelector('#modal-settings');
        M.Modal.getInstance(modal).close();
      });
      
      // close profile
      const closeProfile = document.querySelector('#close-profile');
      closeProfile.addEventListener('click', (e) => {
        e.preventDefault();
        const modal = document.querySelector('#modal-account');
        M.Modal.getInstance(modal).close();
      });

      // change username
      const changeusernameForm = document.querySelector('#change-username-form');
      changeusernameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        var user = firebase.auth().currentUser;
        var credential = firebase.auth.EmailAuthProvider.credential(
          firebase.auth().currentUser.email,
          changeusernameForm['username-password-verify'].value
        );
        user.reauthenticateWithCredential(credential).then(function(cred) {
          db.collection('users').doc(cred.user.uid).update({
            username: changeusernameForm['new-username'].value
          })
          .then(function() {
            // Update successful.
            location.reload();
          }).catch(function(error) {
            // An error happened.
            console.log('username update FAILED');
          });
        })
        .catch(function(error) {
          // An error happened with reauthenication.
            console.log('reauthenication FAILED');
        });
      });

      // change email
      const changeemailForm = document.querySelector('#change-email-form');
      changeemailForm.addEventListener('submit', (e) => {
        e.preventDefault();
        var user = firebase.auth().currentUser;
        var credential = firebase.auth.EmailAuthProvider.credential(
          firebase.auth().currentUser.email,
          changeemailForm['email-password-verify'].value
        );
        user.reauthenticateWithCredential(credential).then(function(userCredential) {
            user.updateEmail(changeemailForm['new-email'].value).then(function() {
            // Update successful.
            console.log('email update successful');
            location.reload();
            }).catch(function(error) {
              // An error happened.
              console.log('email update FAILED');
            });
        })
        .catch(function(error) {
          // An error happened with reauthenication.
            console.log('reauthenication FAILED');
        });
      });

      // change pronouns
      const changepronounsForm = document.querySelector('#change-pronouns-form');
      changepronounsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        var user = firebase.auth().currentUser;
        db.collection('users').doc(user.uid).update({
          pronouns: changepronounsForm['new-pronouns'].value
        })
        .then(function() {
          // Update successful.
          location.reload();
        }).catch(function(error) {
          // An error happened.
          console.log('username update FAILED');
        });
      })

      // change year
      const changeyearForm = document.querySelector('#change-year-form');
      changeyearForm.addEventListener('submit', (e) => {
        e.preventDefault();
        var user = firebase.auth().currentUser;
        db.collection('users').doc(user.uid).update({
          year: changeyearForm['new-year'].value
        })
        .then(function() {
          // Update successful.
          location.reload();
        }).catch(function(error) {
          // An error happened.
          console.log('year update FAILED');
        });
      })

      // edit courses
      const changecoursesForm = document.querySelector('#change-courses-form');
      changecoursesForm.addEventListener('submit', (e) => {
        e.preventDefault();
        var user = firebase.auth().currentUser;
        db.collection('users').doc(user.uid).update({
          courses: changecoursesForm['new-courses'].value
        })
        .then(function() {
          // Update successful.
          location.reload();
        }).catch(function(error) {
          // An error happened.
          console.log('courses update FAILED');
        });
      })

      // edit bio
      const changebioForm = document.querySelector('#change-bio-form');
      changebioForm.addEventListener('submit', (e) => {
        e.preventDefault();
        var user = firebase.auth().currentUser;
        db.collection('users').doc(user.uid).update({
          bio: changebioForm['new-bio'].value
        })
        .then(function() {
          // Update successful.
          location.reload();
        }).catch(function(error) {
          // An error happened.
          console.log('bio update FAILED');
        });
      })

      // change password
      const changepasswordForm = document.querySelector('#change-password-form');
      changepasswordForm.addEventListener('submit', (e) => {
        e.preventDefault();
        var user = firebase.auth().currentUser;
        var credential = firebase.auth.EmailAuthProvider.credential(
          firebase.auth().currentUser.email,
          changepasswordForm['current-password-verify'].value
        );
        user.reauthenticateWithCredential(credential).then(function(userCredential) {
            user.updatePassword(changepasswordForm['new-password'].value).then(function() {
            // Update successful.
            console.log('password update successful');
            location.reload();
            }).catch(function(error) {
              // An error happened.
              console.log('password update FAILED');
            });
        })
        .catch(function(error) {
          // An error happened with reauthenication.
            console.log('reauthenication FAILED');
        });
      }); 

      // Delete account
    }
  }
};

const setupTodolist = (data) => {
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const tasks = doc.data();
      const li = `
        <li>
          <div class=""> ${tasks.task} </div>
        </li>
      `;
      html += li;
    });
    todoList.innerHTML = html
  } else {
    todoList.innerHTML = '<h5 class="center-align">You should not be here</h5>';
  }
};

  

      // delete account
    // const deleteaccountForm = document.querySelector('#delete-account-form');
    // deleteaccountForm.addEventListener('submit', (e) => {
    //   e.preventDefault();
    //   var user = firebase.auth().currentUser;
    //   var credential = firebase.auth.EmailAuthProvider.credential(
    //     firebase.auth().currentUser.email,
    //     deleteaccountForm['delete-password-verify'].value
    //   );
    //   user.reauthenticateWithCredential(credential).then(function(credential) {
    //     db.collection("users").doc(credential.user.uid).delete() // THIS LINE DOES NOT WORK
    //     // Remember to delete all subcollections
    //     user.delete().then(function() {
    //       const modal = document.querySelector('#modal-delete-account');
    //       M.Modal.getInstance(modal).close();
    //       deleteaccountForm.reset();
    //       window.location = 'index.html'
    //     }).catch(function(error) {
    //         console.log('delete user FAILED');
    //     });
    //   })
    //   .catch(function(error) {
    //     // An error happened with reauthenication.
    //       console.log('reauthenication FAILED');
    //   });
    // });

  // setup materialize components
  document.addEventListener('DOMContentLoaded', function() {

    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);

  });
