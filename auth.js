//get reference for setup ui
const LOGGEDINLINKS = document.querySelectorAll('.logged-in');
const LOGGEDOUTLINKS = document.querySelectorAll('.logged-out');



//setup UI function
const SETUPUI = (user => {
    if (user) {
        //toggle ui elements
        LOGGEDINLINKS.forEach(item => item.style.display = 'block');
        LOGGEDOUTLINKS.forEach(item => item.style.display = 'none');
    } else {
        LOGGEDINLINKS.forEach(item => item.style.display = 'none');
        LOGGEDOUTLINKS.forEach(item => item.style.display = 'block');
    }
});

AUTH.onAuthStateChanged(user => {
    if (user) {
        SETUPUI(user);
    } else {
        SETUPUI();
    }
})

//logout
const LOGOUT = document.querySelector('#logout');
LOGOUT.addEventListener('click', (e) => {
    e.preventDefault();
    AUTH.signOut().then(() => {
        SETUPUI([]);
        M.toast({html: 'Logged out successful!'});
    });
});

