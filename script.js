// Admin Telegram ID
const ADMIN_TELEGRAM = "IranianWebAdmin";
let selectedService = "طراحی سایت اختصاصی";

// Modal Controls
function openOrderModal(serviceName) {
    selectedService = serviceName;
    document.getElementById('modalServiceName').innerText = "سرویس انتخابی: " + serviceName;
    document.getElementById('orderModal').style.display = 'flex';
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
}

function openAuthModal(type) {
    if(type === 'login') {
        document.getElementById('authTitle').innerText = "ورود به حساب کاربری";
        document.getElementById('authSubmitBtn').innerText = "ورود به سیستم";
    } else {
        document.getElementById('authTitle').innerText = "ثبت‌نام حساب جدید";
        document.getElementById('authSubmitBtn').innerText = "ایجاد حساب کاربری";
    }
    document.getElementById('authModal').style.display = 'flex';
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

// Order Submission to Telegram Admin
function submitOrder(event) {
    event.preventDefault();
    
    const name = document.getElementById('custName').value;
    const contact = document.getElementById('custContact').value;
    const biz = document.getElementById('custBiz').value;
    const desc = document.getElementById('custDesc').value;

    const message = `سلام جناب ادمین! سفارش جدید از سایت ثبت شد:
----------------------------------
📌 سرویس: ${selectedService}
👤 نام مشتری: ${name}
📞 اطلاعات تماس: ${contact}
🏢 نوع کسب‌وکار: ${biz}
📝 توضیحات تکمیلی: ${desc || "ندارد"}
----------------------------------`;

    const encodedMessage = encodeURIComponent(message);
    const telegramUrl = `https://t.me/${ADMIN_TELEGRAM}?text=${encodedMessage}`;
    
    alert("اطلاعات ثبت شد! اکنون به پیوی ادمین تلگرام هدایت می‌شوید تا تایید نهایی انجام شود.");
    window.open(telegramUrl, '_blank');
    closeOrderModal();
}

function handleAuth(event) {
    event.preventDefault();
    alert("ورود / ثبت‌نام با موفقیت انجام شد.");
    closeAuthModal();
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', () => {
        const answer = item.nextElementSibling;
        if (answer.style.display === 'block') {
            answer.style.display = 'none';
        } else {
            answer.style.display = 'block';
        }
    });
});
