(function () {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null');
    const loginLink = document.querySelector('nav a[href="login.html"]');
    if (!loginLink || !user) return;
    loginLink.textContent = user.username;
    loginLink.style.color = '#8D8DFF';
    loginLink.href = 'profile.html';
})();
