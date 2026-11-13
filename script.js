// ======================================
// 1. عناصر الموقع
// ======================================

const welcomeScreen = document.getElementById("welcomeScreen");
const mainContent = document.getElementById("mainContent");
const openButton = document.getElementById("openButton");

const rosesContainer = document.getElementById("rosesContainer");

const surpriseButton = document.getElementById("surpriseButton");
const surpriseMessage = document.getElementById("surpriseMessage");


// ======================================
// 2. إنشاء حديقة ورود تغطي الشاشة
// ======================================

const flowers = ["🌹", "🌷", "🌺", "🌸", "💗"];

function createFlowers() {

    rosesContainer.innerHTML = "";

    const flowerCount = 110;

    for (let i = 0; i < flowerCount; i++) {

        const flower = document.createElement("div");

        flower.classList.add("rose");

        flower.textContent =
            flowers[Math.floor(Math.random() * flowers.length)];

        // توزيع الورود على الشاشة
        const x = Math.random() * 100;
        const y = Math.random() * 100;

        flower.style.left = x + "%";
        flower.style.top = y + "%";

        // حجم الورود
        flower.style.fontSize =
            (65 + Math.random() * 65) + "px";

        // اتجاه انتشار كل وردة للخارج
        const dx = (x - 50) * 2;
        const dy = (y - 50) * 2;

        flower.style.setProperty("--dx", dx);
        flower.style.setProperty("--dy", dy);

        // ظهور الورود بتوقيت مختلف
        flower.style.setProperty(
            "--appear-delay",
            (Math.random() * 1.2) + "s"
        );

        // توقيت فتح الورود من المنتصف للخارج
        const distanceFromCenter = Math.sqrt(
            Math.pow(x - 50, 2) + Math.pow(y - 50, 2)
        );

        flower.style.setProperty(
            "--open-delay",
            (distanceFromCenter * 0.012) + "s"
        );

        rosesContainer.appendChild(flower);
    }
}

createFlowers();


// ======================================
// 3. فتح الورود والانتقال للموقع
// ======================================

openButton.addEventListener("click", function () {

    if (openButton.disabled) return;

    openButton.disabled = true;

    // تحويل البراعم إلى ورود
    const allFlowers = document.querySelectorAll(".rose");

    allFlowers.forEach(function (flower) {
        flower.textContent =
            flowers[Math.floor(Math.random() * flowers.length)];
    });

    // بدء حركة انتشار الورود
    welcomeScreen.classList.add("opening");

    // الانتقال إلى الصفحة الرئيسية بعد انتهاء الحركة
    setTimeout(function () {

        welcomeScreen.style.display = "none";

        mainContent.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }, 3600);

});


// ======================================
// 4. زر المفاجأة الأخيرة
// ======================================

if (surpriseButton && surpriseMessage) {

    surpriseButton.addEventListener("click", function () {

        surpriseMessage.style.display = "block";

        surpriseButton.style.display = "none";

        surpriseMessage.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });

    });

}


// ======================================
// 5. عداد مدة المعرفة
// التاريخ: 24 يناير 2026
// ======================================

const startDate = new Date(2026, 0, 24, 0, 0, 0);

function updateCounter() {

    const now = new Date();

    const difference = now - startDate;

    if (difference < 0) return;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    if (daysElement) daysElement.textContent = days;

    if (hoursElement) {
        hoursElement.textContent = String(hours).padStart(2, "0");
    }

    if (minutesElement) {
        minutesElement.textContent = String(minutes).padStart(2, "0");
    }

    if (secondsElement) {
        secondsElement.textContent = String(seconds).padStart(2, "0");
    }

}

updateCounter();

setInterval(updateCounter, 1000);


// ======================================
// 6. ظهور رسالة الحب تدريجيًا
// ======================================

const letterParagraphs = document.querySelectorAll(
    ".letter-text p"
);

if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    letterParagraphs.forEach(function (paragraph, index) {

        paragraph.style.opacity = "0";

        paragraph.style.transform = "translateY(25px)";

        paragraph.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

        paragraph.style.transitionDelay =
            (index * 0.08) + "s";

        observer.observe(paragraph);

    });

}


// ======================================
// 7. ظهور الصور تدريجيًا
// ======================================

const photoCards = document.querySelectorAll(".photo-card");

if ("IntersectionObserver" in window) {

    const photoObserver = new IntersectionObserver(function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";

                entry.target.style.transform = "translateY(0)";

                photoObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });

    photoCards.forEach(function (card, index) {

        card.style.opacity = "0";

        card.style.transform = "translateY(35px)";

        card.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

        card.style.transitionDelay =
            (index * 0.12) + "s";

        photoObserver.observe(card);

    });

}