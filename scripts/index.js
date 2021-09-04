// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const accountSettings = document.querySelector('.account-settings');

const setupUI = (user) => {
  if (user) {
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().username}</div>
        <div>${doc.data().pronouns}</div>
        <div>${doc.data().year}</div>
        <div>${doc.data().courses}</div>
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
            <a href="#" class="settings-btn modal-trigger" data-target="change-courses">Edit courses</a>
          </p> 
        </div>
      `;
      accountSettings.innerHTML = settingsHTML;
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    accountSettings.innerHTML = '';
    // toggle user elements
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup guides
const setupGuides = (data) => {
  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
        <li>
          <div class="collapsible-header grey lighten-4"> ${guide.title} </div>
          <div class="collapsible-body white"> ${guide.content} </div>
        </li>
      `;
      html += li;
    });
    guideList.innerHTML = html
  } else {
    guideList.innerHTML = '<p style="color:white">The homepage XD</p>';
  }
};

// settings
const closeSettings = document.querySelector('#close-settings');
closeSettings.addEventListener('click', (e) => {
  e.preventDefault();
  const modal = document.querySelector('#modal-settings');
  M.Modal.getInstance(modal).close();
});

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});
