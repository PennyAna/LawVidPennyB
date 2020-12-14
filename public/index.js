const profile = document.getElementById('profileDiv');
document.getElementById('profileBtn').addEventListener('click', changeProfileView);

function changeProfileView() {
    if (profile.className == 'hidden') {
        profile.className = 'visible';
    }
}          
