const CACHE_NAME = 'qr-scanner-cache-v1';
const urlsToCache = [
    '/',
    '/qr_scanner_pwa.html',
    'https://cdn.tailwindcss.com',
    'https://unpkg.com/@zxing/library@latest'
];

self.addEventListener('install', event => {
    // Cài đặt và lưu trữ tất cả các tệp cần thiết vào bộ nhớ cache
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Phục vụ tệp từ bộ nhớ cache nếu có
                if (response) {
                    return response;
                }
                // Nếu không có, tìm nạp từ mạng
                return fetch(event.request);
            })
    );
});
