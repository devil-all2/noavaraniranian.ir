// Mobile Navigation
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Close nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
});

// Counter animation
const counters = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target;
                }
            };
            updateCounter();
            counterObserver.unobserve(counter);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Scroll to top
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    const originalText = btn.textContent;
    btn.textContent = 'در حال ارسال...';
    btn.disabled = true;

    setTimeout(() => {
        btn.textContent = 'پیام شما ارسال شد!';
        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item, .team-card, .about-grid, .contact-grid').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// Modal Functions
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
    document.body.style.overflow = '';
}

function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => {
        modal.classList.remove('active');
    });
    document.body.style.overflow = '';
}

// Open/Close Modal Events
document.getElementById('openLogin').addEventListener('click', () => openModal('loginModal'));
document.getElementById('openRegister').addEventListener('click', () => openModal('registerModal'));
document.getElementById('closeLogin').addEventListener('click', () => closeModal('loginModal'));
document.getElementById('closeRegister').addEventListener('click', () => closeModal('registerModal'));

// Switch between modals
document.getElementById('switchToRegister').addEventListener('click', (e) => {
    e.preventDefault();
    closeModal('loginModal');
    setTimeout(() => openModal('registerModal'), 200);
});

document.getElementById('switchToLogin').addEventListener('click', (e) => {
    e.preventDefault();
    closeModal('registerModal');
    setTimeout(() => openModal('loginModal'), 200);
});

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeAllModals();
        }
    });
});

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
    }
});

// Toast notification
function showToast(title, message) {
    const toast = document.getElementById('toast');
    document.getElementById('toastTitle').textContent = title;
    document.getElementById('toastMessage').textContent = message;
    toast.classList.add('visible');
    setTimeout(() => toast.classList.remove('visible'), 3000);
}

// Password strength checker
const regPassword = document.getElementById('regPassword');
const strengthFill = document.getElementById('strengthFill');
const strengthText = document.getElementById('strengthText');

if (regPassword) {
    regPassword.addEventListener('input', (e) => {
        const password = e.target.value;
        let strength = 0;
        let label = '';
        let className = '';

        if (password.length >= 6) strength++;
        if (password.length >= 8) strength++;
        if (/[A-Z]/.test(password)) strength++;
        if (/[0-9]/.test(password)) strength++;
        if (/[^A-Za-z0-9]/.test(password)) strength++;

        if (strength <= 2) {
            className = 'weak';
            label = 'ضعیف';
        } else if (strength <= 4) {
            className = 'medium';
            label = 'متوسط';
        } else {
            className = 'strong';
            label = 'قوی';
        }

        strengthFill.className = 'strength-fill ' + (password.length > 0 ? className : '');
        strengthText.textContent = password.length > 0 ? 'قدرت رمز عبور: ' + label : 'قدرت رمز عبور';
    });
}

// Register form
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const firstName = document.getElementById('regFirstName').value;
        const lastName = document.getElementById('regLastName').value;
        const email = document.getElementById('regEmail').value;
        const phone = document.getElementById('regPhone').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        const terms = document.getElementById('regTerms').checked;

        if (password !== confirmPassword) {
            showToast('خطا!', 'رمز عبور و تکرار آن مطابقت ندارند');
            return;
        }

        if (!terms) {
            showToast('خطا!', 'لطفاً شرایط و قوانین را بپذیرید');
            return;
        }

        // Check if email exists
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        if (users.find(u => u.email === email)) {
            showToast('خطا!', 'این ایمیل قبلاً ثبت شده است');
            return;
        }

        const btn = registerForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'در حال ثبت نام...';
        btn.disabled = true;

        setTimeout(() => {
            // Create user object
            const newUser = {
                firstName,
                lastName,
                email,
                phone,
                password,
                joinDate: new Date().toLocaleDateString('fa-IR'),
                job: '',
                bio: '',
                avatar: null
            };

            // Save to users list
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));

            // Auto login
            localStorage.setItem('currentUser', JSON.stringify(newUser));

            btn.textContent = 'ثبت نام موفق!';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            showToast('خوش آمدید!', 'ثبت نام شما با موفقیت انجام شد');

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        }, 1500);
    });
}

// Login form
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);

        if (!user) {
            showToast('خطا!', 'ایمیل یا رمز عبور اشتباه است');
            return;
        }

        const btn = loginForm.querySelector('button[type="submit"]');
        const originalText = btn.textContent;
        btn.textContent = 'در حال ورود...';
        btn.disabled = true;

        setTimeout(() => {
            // Save current user
            localStorage.setItem('currentUser', JSON.stringify(user));

            btn.textContent = 'ورود موفق!';
            btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
            showToast('خوش آمدید!', 'با موفقیت وارد حساب خود شدید');

            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 1000);
        }, 1500);
    });
}

// Check if user is logged in and update header
function updateHeaderAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const navActions = document.querySelector('.nav-actions');
    
    if (currentUser && navActions) {
        const firstName = currentUser.firstName || '';
        const initial = firstName ? firstName.charAt(0) : 'ک';
        
        navActions.innerHTML = `
            <button class="cart-btn" id="openCart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                </svg>
                <span class="cart-count" id="cartCount">۰</span>
            </button>
            <a href="dashboard.html" class="btn btn-outline btn-sm user-btn">
                <span class="user-avatar-small">${initial}</span>
                حساب من
            </a>
        `;
        
        // Re-attach cart events
        document.getElementById('openCart').addEventListener('click', () => openModal('cartModal'));
    }
}

updateHeaderAuth();

// Cart System
let cart = JSON.parse(localStorage.getItem('cart') || '[]');

function updateCartCount() {
    const countEl = document.getElementById('cartCount');
    if (countEl) {
        countEl.textContent = toPersianNum(cart.length);
    }
}

function toPersianNum(num) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, d => persianDigits[d]);
}

function toPersianPrice(num) {
    return num.toLocaleString('fa-IR');
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    const totalAmount = document.getElementById('totalAmount');
    
    if (!cartItems) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="cart-empty">سبد خرید شما خالی است</p>';
        cartSummary.style.display = 'none';
        return;
    }
    
    cartSummary.style.display = 'block';
    
    let html = '';
    let total = 0;
    
    cart.forEach((item, index) => {
        total += item.price;
        html += `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${toPersianPrice(item.price)} تومان</p>
                </div>
                <button class="cart-item-remove" data-index="${index}">&times;</button>
            </div>
        `;
    });
    
    cartItems.innerHTML = html;
    totalAmount.textContent = toPersianPrice(total) + ' تومان';
    
    // Remove item events
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            const index = parseInt(btn.getAttribute('data-index'));
            cart.splice(index, 1);
            saveCart();
        });
    });
}

// Add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', () => {
        const product = btn.getAttribute('data-product');
        const price = parseInt(btn.getAttribute('data-price'));
        const name = btn.getAttribute('data-name');
        
        // Check if already in cart
        if (cart.find(item => item.product === product)) {
            showToast('توجه', 'این محصول قبلاً به سبد اضافه شده');
            return;
        }
        
        cart.push({ product, price, name });
        saveCart();
        
        // Button feedback
        const originalText = btn.textContent;
        btn.textContent = 'اضافه شد!';
        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 1500);
        
        showToast('موفق!', `${name} به سبد خرید اضافه شد`);
    });
});

// Open cart modal
document.getElementById('openCart').addEventListener('click', () => {
    openModal('cartModal');
});

document.getElementById('closeCart').addEventListener('click', () => {
    closeModal('cartModal');
});

// Checkout
document.getElementById('checkoutBtn').addEventListener('click', () => {
    closeModal('cartModal');
    openCheckoutModal();
});

// Open checkout modal
function openCheckoutModal() {
    if (cart.length === 0) {
        showToast('توجه', 'سبد خرید شما خالی است');
        return;
    }
    
    // Fill summary
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');
    const checkoutUserInfo = document.getElementById('checkoutUserInfo');
    
    let itemsHtml = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price;
        itemsHtml += `<div class="checkout-item-row"><span>${item.name}</span><span>${toPersianPrice(item.price)} تومان</span></div>`;
    });
    
    checkoutItems.innerHTML = itemsHtml;
    checkoutTotal.textContent = toPersianPrice(total) + ' تومان';
    
    // Pre-fill name if logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        const name = (currentUser.firstName + ' ' + currentUser.lastName).trim();
        document.getElementById('coName').value = name || '';
        document.getElementById('coPhone').value = currentUser.phone || '';
        document.getElementById('coEmail').value = currentUser.email || '';
        checkoutUserInfo.innerHTML = `<strong>نام:</strong> ${name || '-'}<br><strong>تلفن:</strong> ${currentUser.phone || '-'}<br><strong>ایمیل:</strong> ${currentUser.email || '-'}`;
    }
    
    // Reset to step 1
    document.getElementById('checkoutStep1').classList.add('active');
    document.getElementById('checkoutStep2').classList.remove('active');
    document.querySelectorAll('.checkout-steps .step')[0].classList.add('active');
    document.querySelectorAll('.checkout-steps .step')[1].classList.remove('active');
    
    openModal('checkoutModal');
}

// Checkout steps
document.getElementById('checkoutNext').addEventListener('click', () => {
    const name = document.getElementById('coName').value.trim();
    const phone = document.getElementById('coPhone').value.trim();
    const city = document.getElementById('coCity').value.trim();
    
    if (!name || !phone || !city) {
        showToast('خطا!', 'لطفاً فیلدهای ضروری را پر کنید');
        return;
    }
    
    // Update summary user info
    const email = document.getElementById('coEmail').value.trim();
    const message = document.getElementById('coMessage').value.trim();
    const checkoutUserInfo = document.getElementById('checkoutUserInfo');
    
    checkoutUserInfo.innerHTML = `
        <strong>نام:</strong> ${name}<br>
        <strong>تلفن:</strong> ${phone}<br>
        <strong>شهر:</strong> ${city}
        ${email ? '<br><strong>ایمیل:</strong> ' + email : ''}
        ${message ? '<br><strong>توضیحات:</strong> ' + message : ''}
    `;
    
    // Go to step 2
    document.getElementById('checkoutStep1').classList.remove('active');
    document.getElementById('checkoutStep2').classList.add('active');
    document.querySelectorAll('.checkout-steps .step')[0].classList.remove('active');
    document.querySelectorAll('.checkout-steps .step')[0].classList.add('completed');
    document.querySelectorAll('.checkout-steps .step')[1].classList.add('active');
});

document.getElementById('checkoutBack').addEventListener('click', () => {
    document.getElementById('checkoutStep2').classList.remove('active');
    document.getElementById('checkoutStep1').classList.add('active');
    document.querySelectorAll('.checkout-steps .step')[1].classList.remove('active');
    document.querySelectorAll('.checkout-steps .step')[0].classList.remove('completed');
    document.querySelectorAll('.checkout-steps .step')[0].classList.add('active');
});

// Submit order to Telegram
document.getElementById('checkoutForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = document.getElementById('checkoutSubmit');
    submitBtn.textContent = 'در حال ارسال...';
    submitBtn.disabled = true;
    
    const name = document.getElementById('coName').value.trim();
    const phone = document.getElementById('coPhone').value.trim();
    const email = document.getElementById('coEmail').value.trim();
    const city = document.getElementById('coCity').value.trim();
    const message = document.getElementById('coMessage').value.trim();
    
    let total = 0;
    let productsText = '';
    cart.forEach(item => {
        total += item.price;
        productsText += `  - ${item.name}: ${toPersianPrice(item.price)} تومان\n`;
    });
    
    const telegramMessage = `
🛒 *سفارش جدید*

👤 *نام:* ${name}
📱 *تلفن:* ${phone}
${email ? '📧 *ایمیل:* ' + email + '\n' : ''}🏙️ *شهر:* ${city}
${message ? '💬 *توضیحات:* ' + message + '\n' : ''}
━━━━━━━━━━━━━━
📦 *محصولات:*
${productsText}
━━━━━━━━━━━━━━
💰 *جمع کل:* ${toPersianPrice(total)} تومان
⏰ *تاریخ:* ${new Date().toLocaleDateString('fa-IR')} ${new Date().toLocaleTimeString('fa-IR')}
    `;
    
    // ⚠️ توکن بات تلگرام خود را اینجا قرار دهید
    // از @BotFather در تلگرام بات بسازید و توکن را کپی کنید
    const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN_HERE';
    const TELEGRAM_CHAT_ID = '@Ar9hiya';  // آیدی تلگرام شما
    
    // ارسال با استفاده از Telegram Bot API
    // توجه: برای ارسال به کاربر، به Chat ID عددی نیاز دارید
    // ابتدا به ربات @userinfobot پیام بدید تا Chat ID خودتون رو بگیرید
    
    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: telegramMessage,
            parse_mode: 'Markdown'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            showToast('موفق!', 'سفارش شما با موفقیت ثبت شد. به زودی با شما تماس می‌گیریم.');
            cart = [];
            saveCart();
            closeModal('checkoutModal');
            document.getElementById('checkoutForm').reset();
        } else {
            // Fallback: open Telegram with pre-filled message
            sendViaTelegramDeepLink(telegramMessage);
        }
    })
    .catch(() => {
        // Fallback: open Telegram with pre-filled message
        sendViaTelegramDeepLink(telegramMessage);
    })
    .finally(() => {
        submitBtn.textContent = 'تأیید و ارسال سفارش';
        submitBtn.disabled = false;
    });
});

// Fallback: send via Telegram deep link
function sendViaTelegramDeepLink(message) {
    const cleanMessage = message.replace(/[*_]/g, '');
    const encodedMessage = encodeURIComponent(cleanMessage);
    const telegramUrl = `https://t.me/Ar9hiya?text=${encodedMessage}`;
    
    window.open(telegramUrl, '_blank');
    
    showToast('توجه', 'پیام را در تلگرام ارسال کنید');
    cart = [];
    saveCart();
    closeModal('checkoutModal');
    document.getElementById('checkoutForm').reset();
}

// Close checkout modal
document.getElementById('closeCheckout').addEventListener('click', () => {
    closeModal('checkoutModal');
});

// Initialize cart
updateCartCount();
renderCart();
