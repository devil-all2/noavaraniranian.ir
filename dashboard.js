// Check if user is logged in
function getUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

function saveUser(user) {
    localStorage.setItem('currentUser', JSON.stringify(user));
}

function getAllUsers() {
    const users = localStorage.getItem('users');
    return users ? JSON.parse(users) : [];
}

function saveAllUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// Redirect if not logged in
const currentUser = getUser();
if (!currentUser) {
    window.location.href = 'index.html';
}

// Toast notification
function showToast(title, message, isError = false) {
    const toast = document.getElementById('toast');
    const toastIcon = toast.querySelector('.toast-icon');
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastMessage').textContent = message;
    
    if (isError) {
        toast.style.borderRightColor = '#ef4444';
        toastIcon.style.color = '#ef4444';
    } else {
        toast.style.borderRightColor = '#10b981';
        toastIcon.style.color = '#10b981';
    }
    
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3000);
}

// Sidebar Toggle
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarClose = document.getElementById('sidebarClose');

if (sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.add('active');
    });
}

if (sidebarClose) {
    sidebarClose.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });
}

// Tab Navigation
const sidebarLinks = document.querySelectorAll('.sidebar-link[data-tab]');
const tabs = document.querySelectorAll('.dash-tab');

sidebarLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const tabId = link.getAttribute('data-tab');
        
        // Update active link
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        
        // Show tab
        tabs.forEach(tab => tab.classList.remove('active'));
        document.getElementById('tab-' + tabId).classList.add('active');
        
        // Close mobile sidebar
        sidebar.classList.remove('active');
    });
});

// Display User Info
function displayUserInfo() {
    if (!currentUser) return;
    
    const firstName = currentUser.firstName || '';
    const lastName = currentUser.lastName || '';
    const fullName = (firstName + ' ' + lastName).trim() || 'کاربر';
    const initial = firstName ? firstName.charAt(0) : 'ک';
    
    document.getElementById('displayName').textContent = fullName;
    document.getElementById('displayEmail').textContent = currentUser.email || '-';
    document.getElementById('displayPhone').textContent = currentUser.phone || '-';
    document.getElementById('displayJoinDate').textContent = currentUser.joinDate || '-';
    document.getElementById('displayAvatar').textContent = initial;
    
    // Edit form
    document.getElementById('editFirstName').value = firstName;
    document.getElementById('editLastName').value = lastName;
    document.getElementById('editEmail').value = currentUser.email || '';
    document.getElementById('editPhone').value = currentUser.phone || '';
    document.getElementById('editJob').value = currentUser.job || '';
    document.getElementById('editBio').value = currentUser.bio || '';
    document.getElementById('editAvatarPreview').textContent = initial;
}

displayUserInfo();

// Edit Profile Form
const editProfileForm = document.getElementById('editProfileForm');
editProfileForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newPassword = document.getElementById('editNewPassword').value;
    const confirmNewPassword = document.getElementById('editConfirmNewPassword').value;
    const currentPassword = document.getElementById('editCurrentPassword').value;
    
    // Check current password if changing
    if (newPassword || confirmNewPassword) {
        if (!currentPassword) {
            showToast('خطا!', 'لطفاً رمز عبور فعلی را وارد کنید', true);
            return;
        }
        if (currentPassword !== currentUser.password) {
            showToast('خطا!', 'رمز عبور فعلی اشتباه است', true);
            return;
        }
        if (newPassword !== confirmNewPassword) {
            showToast('خطا!', 'رمز عبور جدید و تکرار آن مطابقت ندارند', true);
            return;
        }
        if (newPassword.length < 6) {
            showToast('خطا!', 'رمز عبور جدید باید حداقل ۶ کاراکتر باشد', true);
            return;
        }
    }
    
    // Update user data
    const updatedUser = {
        ...currentUser,
        firstName: document.getElementById('editFirstName').value,
        lastName: document.getElementById('editLastName').value,
        email: document.getElementById('editEmail').value,
        phone: document.getElementById('editPhone').value,
        job: document.getElementById('editJob').value,
        bio: document.getElementById('editBio').value
    };
    
    if (newPassword) {
        updatedUser.password = newPassword;
    }
    
    // Save to currentUser
    saveUser(updatedUser);
    
    // Update in users list
    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        saveAllUsers(users);
    }
    
    // Clear password fields
    document.getElementById('editCurrentPassword').value = '';
    document.getElementById('editNewPassword').value = '';
    document.getElementById('editConfirmNewPassword').value = '';
    
    // Refresh display
    displayUserInfo();
    
    showToast('موفق!', 'پروفایل شما با موفقیت به‌روزرسانی شد');
});

// Cancel Edit
document.getElementById('cancelEdit').addEventListener('click', () => {
    displayUserInfo();
    document.getElementById('editCurrentPassword').value = '';
    document.getElementById('editNewPassword').value = '';
    document.getElementById('editConfirmNewPassword').value = '';
});

// Avatar Change
const changeAvatarBtn = document.getElementById('changeAvatarBtn');
const avatarInput = document.getElementById('avatarInput');

changeAvatarBtn.addEventListener('click', () => {
    avatarInput.click();
});

avatarInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 2 * 1024 * 1024) {
            showToast('خطا!', 'حجم فایل نباید بیشتر از ۲ مگابایت باشد', true);
            return;
        }
        
        const reader = new FileReader();
        reader.onload = (event) => {
            const updatedUser = { ...currentUser, avatar: event.target.result };
            saveUser(updatedUser);
            
            const users = getAllUsers();
            const userIndex = users.findIndex(u => u.email === currentUser.email);
            if (userIndex !== -1) {
                users[userIndex] = updatedUser;
                saveAllUsers(users);
            }
            
            document.getElementById('editAvatarPreview').style.backgroundImage = `url(${event.target.result})`;
            document.getElementById('editAvatarPreview').style.backgroundSize = 'cover';
            document.getElementById('editAvatarPreview').textContent = '';
            
            showToast('موفق!', 'عکس پروفایل تغییر کرد');
        };
        reader.readAsDataURL(file);
    }
});

// Logout
document.getElementById('logoutBtn').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
});

// Delete Account
document.getElementById('deleteAccountBtn').addEventListener('click', () => {
    if (confirm('آیا مطمئن هستید؟ تمام اطلاعات شما پاک خواهد شد.')) {
        const users = getAllUsers();
        const filteredUsers = users.filter(u => u.email !== currentUser.email);
        saveAllUsers(filteredUsers);
        localStorage.removeItem('currentUser');
        window.location.href = 'index.html';
    }
});
