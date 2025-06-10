const firefox = require('selenium-webdriver/firefox');
const { Builder, Browser, By, Key, until} = require('selenium-webdriver');
require('dotenv').config();


;(async function example() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).setFirefoxOptions(new firefox.Options().addArguments('--headless')).build()
    await driver.get('http://detectportal.firefox.com/canonical.html');
    await driver.findElement(By.id('email_field')).sendKeys(process.env.email);
    await driver.findElement(By.id('password_field')).sendKeys(process.env.passwd , Key.RETURN);
    await driver.wait(until.titleIs('Job Corps - Sign In'), 10000);
    console.log("Logged In");
})()