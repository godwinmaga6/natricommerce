//get profile image for upload
let profileImg = {};
function chooseProfileImg(e){
    e.preventDefault();
    profileImg = e.target.files[0];
}

//get product image for upload
let productImg = {};
function chooseProductImg(e){
    e.preventDefault();
    productImg = e.target.files[0];
}

//get signup form element
const SIGNUPFORM = document.querySelector('#signup-form');
const PRODUCTFORM = document.querySelector('#product-form');

//get product form inputs values
PRODUCTFORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const PRODUCTNAME = PRODUCTFORM['product-name'].value;
    const PRODUCTPRICE = PRODUCTFORM['product-price'].value;
    const PRODUCTDES = PRODUCTFORM['product-des'].value;
    
    

    //ADD the product to collections first
    return DB.collection('products').add({
        name: PRODUCTNAME,
        price: PRODUCTPRICE,
        description: PRODUCTDES
    }).catch(err =>{
        alert(err.message); //log any error
    }).then(doc => {
        //ADD the image 
        STORAGE.ref(`products/${doc.id}/product.jpg`).put(productImg).then(function () {
            M.toast({ html: 'New product added!' });
            //close the modal after user submit
            const MODAL = document.querySelector('#modal-add-product');
            M.Modal.getInstance(MODAL).close();
            SIGNUPFORM.reset();
        }).catch(err => {
            alert(err.message); //log any error
        });
    }).catch(err => { 
        alert(err.message);
    });
});

//get signup form inputs values
SIGNUPFORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const EMAIL = SIGNUPFORM['signup-email'].value;
    const PASSWORD = SIGNUPFORM['signup-password'].value;
    // const PROFILEIMAGE = SIGNUPFORM['profile-image'].value;
    //signup the user
    AUTH.createUserWithEmailAndPassword(EMAIL, PASSWORD).catch(err => {
        alert(err.message);
    }).then(cred => {
        // console.log(cred.user.uid);
        //upload profile image with uer's id
        STORAGE.ref(`users/${cred.user.uid}/profile.jpg`).put(profileImg).then(function () {
        M.toast({html: 'Image successfully uploaded!'});
        }).catch(err => {
            alert(err.message);
        });

        return DB.collection('users').doc(cred.user.uid).set({
            firstname: SIGNUPFORM['first-name'].value,
            lastname: SIGNUPFORM['last-name'].value,
        });
    }).then(() => {
        M.toast({html: 'Registration successful!'});
        //close the modal after user submit
        const MODAL = document.querySelector('#modal-signup');
        M.Modal.getInstance(MODAL).close();
        SIGNUPFORM.reset();
        // window.location.href = "admin.html"; //takes user to dashboard after a successful registeration
    });
});

const ACCOUNTDETAILS = document.querySelectorAll('#account-details');
const WELCOMEMSG = document.querySelectorAll('.welcome');

//setup UI function
const SETUPADMINUI = (user => {
    if (user) {
        // account info
        DB.collection('users').doc(user.uid).get().then(doc => {
            const PROFILE = `
            <div>Logged in as ${user.email}</div>
            <div class="left-align"><strong>Firstname:</strong> ${doc.data().firstname} </br > <strong>Last Name:</strong> ${doc.data().lastname}</div>
          `;

            const WELCOME = `
            <div>Welcome: ${doc.data().firstname} ${doc.data().lastname}</div>
            `;

            ACCOUNTDETAILS.forEach(act => {
                act.innerHTML = PROFILE;
            });

            WELCOMEMSG.forEach(msg => {
                msg.innerHTML = WELCOME; 
            })
          });
        
    } else {
        ACCOUNTDETAILS.forEach(act => {
            act.innerHTML = '';
        });

        WELCOMEMSG.forEach(msg => {
            msg.innerHTML = ''; 
        })
    }
});

AUTH.onAuthStateChanged(user => {
    let profileImage = document.querySelector('#profile-image'); //get default profile image
    if (user) {
        console.log('Logged in successful..');
        SETUPADMINUI(user);
        //get profile image from stroage
        STORAGE.ref(`users/${user.uid}/profile.jpg`).getDownloadURL().then(imgURL => {
            profileImage.src = imgURL; //set default profile img to user's img
        });
    } else {
        SETUPADMINUI();
        profileImage.src = './asseth/user_male.png'; //reset to default profile img
    }
});

//login form
const LOGINFORM = document.querySelector('#login-form');

LOGINFORM.addEventListener('submit', (e) => {
    e.preventDefault();
    const EMAIL = LOGINFORM['login-email'].value;
    const PASSWORD = LOGINFORM['login-password'].value;

    AUTH.signInWithEmailAndPassword(EMAIL, PASSWORD).then(function () {
            LOGINFORM.reset();
            // window.location.href = "admin.html";
            M.toast({ html: 'Logged in successful!' }); //Pop up login successful

            //close the modal after user submit
            const MODAL = document.querySelector('#modal-login');
            M.Modal.getInstance(MODAL).close();
        }).catch(err => {
        alert(err.message);
    });
});

// logout function for mobile view
function logout() {
    AUTH.signOut();
}

let loggedOutNotifyer = document.querySelector('.logged-out-notifyer');
let loggedInNotifyer = document.querySelector('.logged-in-notifyer');

AUTH.onAuthStateChanged(user => {
    if(user){
        loggedInNotifyer.classList.remove('hide');
        loggedOutNotifyer.classList.add('hide');
        document.querySelector('.guide-list').classList.remove('hide');
        document.querySelector('.tabs-section').classList.remove('hide');
    } else {
        loggedInNotifyer.classList.add('hide');
        loggedOutNotifyer.classList.remove('hide');
        document.querySelector('.guide-list').classList.add('hide');
        document.querySelector('.tabs-section').classList.add('hide');
    }
});

//viewing products function
// function viewProduct() {
//     let li = document.createElement('li');
//     let price = document.createElement('span');
//     let 
// }