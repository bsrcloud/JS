{
  "name": "BSrifa.com",
  "short_name": "BSrifa",
  "start_url": "https://www.bsrifa.com",
  "display": "standalone",
  "background_color": "#000000",
  "theme_color": "#fff6f6",
  "icons": [
    {
      "src": "https://github.com/bayurifa/Image/raw/refs/heads/main/192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "https://github.com/bayurifa/Image/raw/refs/heads/main/512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}

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
