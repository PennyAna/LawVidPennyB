const login = document.getElementById('loginDiv');
const profile = document.getElementById('profileDiv');document.getElementById('loginBtn').addEventListener('click', changeLoginView);
document.getElementById('profileBtn').addEventListener('click', changeProfileView);

function changeLoginView() {
    if (login.className == 'hidden') {
        login.className = 'visible';
    }
}
function changeProfileView() {
    if (profile.className == 'hidden') {
        profile.className = 'visible';
    }
}          