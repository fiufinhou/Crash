const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

module.exports = async () => {
    try {
        const options = {
            headless: true, // تم تعطيل وضع الرأسية لأننا نستخدم الهاتف
            ignoreHTTPSErrors: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--ignore-certificate-errors',
                '--disable-dev-shm-usage', // تمت إضافته
                '--disable-gpu', // تمت إضافته
                '--disable-xss-auditor', // تمت إضافته
                '--disable-web-security', // تمت إضافته
            ],
            executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', // تم تحديده لمتصفح Google Chrome
        };
        await puppeteer.use(StealthPlugin());
        const browser = await puppeteer.launch(options);
        const browserWSEndpoint = await browser.wsEndpoint();
        console.log("browserWSEndpoint: ", browserWSEndpoint);
        await browser.disconnect();
        return browserWSEndpoint;
    } catch (err) {
        console.error(err);
        process.exit(1);
        return false;
    }
};
