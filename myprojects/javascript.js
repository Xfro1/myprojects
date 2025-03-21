document.addEventListener("DOMContentLoaded", function () {
    const currentPath = window.location.pathname.split("/").pop(); 

    // تفعيل زر الخدمات بالهيدر إذا كنت في صفحة الخدمات
    if (window.location.pathname.includes("services.html")) {
        document.querySelector(".nav-services").classList.add("active");
    }

    // تفعيل زر "View Details" عند النقر
    let viewDetailsButtons = document.querySelectorAll(".view-details");
    viewDetailsButtons.forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // يمنع التحويل الفوري
            localStorage.setItem("activePage", "services"); // يخزن أن المستخدم ضغط على فيو ديتيلز
            window.location.href = "services.html"; // ينقلك إلى صفحة الخدمات
        });
    });

    // عند تحميل صفحة الخدمات، التأكد من تفعيل "View Details"
    if (window.location.pathname.includes("services.html") && localStorage.getItem("activePage") === "services") {
        document.querySelectorAll(".view-details").forEach(btn => {
            btn.classList.add("active");
        });
        localStorage.removeItem("activePage"); // حتى لا يبقى الزر مفعّل بعد الرجوع للصفحة
    }
});

function toggleDetails(button) {
    var box = button.parentElement;
    var fullText = box.querySelector(".full-text");
    var shortText = box.querySelector(".short-text");

    if (fullText.style.display === "none" || fullText.style.display === "") {
        fullText.style.display = "block";
        shortText.style.display = "none";
        button.innerText = "Show Less";
    } else {
        fullText.style.display = "none";
        shortText.style.display = "block";
        button.innerText = "View Details";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const successMsg = document.getElementById("successMsg");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // خزن المعلومات في الـ Local Storage
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const subject = document.getElementById("subject").value;
        const message = document.getElementById("message").value;

        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            date: new Date().toLocaleString()
        };

        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages.push(formData);
        localStorage.setItem("messages", JSON.stringify(messages));

        // إظهار رسالة نجاح
        successMsg.style.display = "block";
        setTimeout(() => {
            successMsg.style.display = "none";
            form.reset();
        }, 3000);
    });
});
