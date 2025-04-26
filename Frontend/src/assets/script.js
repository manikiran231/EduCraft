const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const profileIcon = document.getElementById('profile-icon');
const dropdown = document.getElementById('dropdown');

// Toggle Sidebar
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

// Toggle Profile Dropdown
profileIcon.addEventListener('click', () => {
    dropdown.classList.toggle('show');
});
