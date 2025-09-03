// Fungsi untuk memeriksa apakah atribut rel diubah atau dihapus
function monitorRelAttribute(elementSelector) {
    const element = document.querySelector(elementSelector);
    
    if (!element) {
        console.warn('Elemen dengan selector "' + elementSelector + '" tidak ditemukan.');
        return;
    }

    // Simpan nilai awal rel
    const originalRel = element.getAttribute('rel') || '';

    // Gunakan MutationObserver untuk memantau perubahan atribut
    const observer = new MutationObserver(function (mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'rel') {
                const currentRel = element.getAttribute('rel') || '';

                // Jika rel tidak ada atau bukan "jsxx", redirect
                if (!currentRel || currentRel !== 'jsxx') {
                    console.log('Atribut rel diubah atau dihapus. Redirect ke template_3.html...');
                    window.location.href = 'https://www.bsrifa.com/p/template_3.html';
                }
            }
        }
    });

    // Mulai memantau perubahan pada atribut rel
    observer.observe(element, {
        attributes: true,
        attributeFilter: ['rel']
    });
}
