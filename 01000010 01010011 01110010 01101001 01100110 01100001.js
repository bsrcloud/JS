(function () {
    const TARGET_ID = 'BSrifa';
    const DETECT_URL = 'https://www.bsrifa.com/p/detect.html?m=1';

    // 📝 Template awal yang harus dipertahankan
    const EXPECTED_HTML = `<div id="BSrifa" style="display:none;">
Tema dibuat oleh Bayu Samudra Rifa<br/>
Publisher: BSrifa<br/>
Web: www.bsrifa.com
</div>`;

    // ✅ Fungsi: Bersihkan dan normalisasi HTML untuk perbandingan
    const getCleanHTML = (element) => {
        if (!element) return '';
        return element.outerHTML.replace(/\s+/g, ' ').trim();
    };

    // ✅ Fungsi: Cek apakah elemen masih sesuai dengan template awal
    const isElementValid = (element) => {
        if (!element) return false;
        const cleanHTML = getCleanHTML(element);
        const cleanExpected = getCleanHTML(new DOMParser().parseFromString(EXPECTED_HTML, 'text/html').getElementById(TARGET_ID));
        return cleanHTML === cleanExpected;
    };

    // 🔍 Fungsi: Cek apakah script dengan rel="jsxx" ada
    const isJsxxScriptPresent = () => {
        const scripts = document.querySelectorAll('script[rel="jsxx"]');
        return scripts.length > 0;
    };

    // 💥 Fungsi: Redirect ke deteksi jika terjadi perubahan atau penghapusan
    const redirectToDetect = () => {
        console.warn('⚠️ Widget atau script jsxx terdeteksi diubah/dihapus. Redirect ke halaman deteksi.');
        window.location.href = DETECT_URL;
    };

    // 🚨 Fungsi: Monitor perubahan pada elemen target dan script rel="jsxx"
    const monitorElements = () => {
        const widget = document.getElementById(TARGET_ID);

        // Jika widget tidak ada
        if (!widget) {
            redirectToDetect();
            return;
        }

        // Jika widget tidak sesuai template
        if (!isElementValid(widget)) {
            redirectToDetect();
            return;
        }

        // Jika script rel="jsxx" tidak ada
        if (!isJsxxScriptPresent()) {
            redirectToDetect();
            return;
        }

        // 🎯 Inisialisasi MutationObserver
        const observer = new MutationObserver(function (mutations) {
            const widget = document.getElementById(TARGET_ID);
            const hasJsxxScript = isJsxxScriptPresent();

            // Cek kondisi penting: apakah widget atau script jsxx hilang?
            if (!widget || !isElementValid(widget) || !hasJsxxScript) {
                observer.disconnect();
                redirectToDetect();
            }
        });

        // Mulai amati semua perubahan di `body`
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style', 'id', 'rel'],
            characterData: true
        });

        // 🔁 Cek ulang setiap 2 detik sebagai fallback
        setInterval(() => {
            const widget = document.getElementById(TARGET_ID);
            const hasJsxxScript = isJsxxScriptPresent();

            if (!widget || !isElementValid(widget) || !hasJsxxScript) {
                redirectToDetect();
            }
        }, 2000);
    };

    // 🚀 Jalankan saat DOM siap
    document.addEventListener('DOMContentLoaded', monitorElements);

    // ✅ Tambahan: Cek pada load halaman jika ada perubahan setelah render awal
    window.addEventListener('load', () => {
        // Cek ulang jika ada perubahan dari pengguna
    });
})();
