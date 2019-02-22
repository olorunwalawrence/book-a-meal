
$('form').on('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const pass = document.getElementById('login-password').value;

  // console.log(email);

  if (email === 'bookameal@mail.com') {
    console.log(email);
    window.location.href = './dashboard.html';
  } else {
    window.location.href = './user-menu.html';
  }
});