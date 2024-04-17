const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

module.exports = async () => {
    try {
        const options = {
            headless: true, // تعديل: تم تعطيل وضع الرأسية
            ignoreHTTPSErrors: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--ignore-certificate-errors',
            ],
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
