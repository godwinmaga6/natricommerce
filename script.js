const LOGINMODAL = document.getElementById('popup-1');
const SIGNUPMOAL = document.getElementById('popup-2');
const OVERLAY = document.querySelectorAll('.overlay');

OVERLAY.forEach((layer)=> {
    layer.addEventListener('click', () => {
        if(LOGINMODAL.classList.contains('active')){
            LOGINMODAL.classList.remove('active');
        }
    
       if(SIGNUPMOAL.classList.contains('active')){
            SIGNUPMOAL.classList.remove('active');
       }
    })
})

let meanMenu = document.querySelector('.meanmenu-reveal');
function togglePopup(){
   LOGINMODAL.classList.toggle('active');
   meanMenu.classList.remove('meanClose');
}

function toggleSignup(){
    SIGNUPMOAL.classList.toggle('active');
    meanMenu.classList.remove('meanClose');
}