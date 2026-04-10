import puppeteer from 'puppeteer';

(async () => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        
        page.on('console', msg => {
            if (msg.type() === 'error') {
                console.log('PAGE ERROR LOG:', msg.text());
            }
        });
        
        page.on('pageerror', err => {
            console.log('PAGE SCRIPT ERROR:', err.toString());
        });
        
        await page.goto('http://localhost:8082', { waitUntil: 'networkidle2' });
        await new Promise(r => setTimeout(r, 2000));
        await browser.close();
    } catch(e) {
        console.error("Puppeteer fail", e);
    }
})();
