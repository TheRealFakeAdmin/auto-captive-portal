const firefox = require('selenium-webdriver/firefox');
const { Builder, Browser, By, Key, until} = require('selenium-webdriver');

// Load environment variables from .env
require('dotenv').config();

// Setup constants with needed env variables
const
  loginEmail = process.env["email"],
  loginPass = process.env["passwd"],
  userElementId = process.env["user-id"],
  passElementId = process.env["pass-id"],
  redirectTitle = process.env["redirect-title"];


(async ()=>{

    // Open a headless Firefox instance
    let driver = await new Builder().forBrowser(Browser.FIREFOX).setFirefoxOptions(new firefox.Options().addArguments('--headless')).build();

    // Navigate to Firefox's canonical portal detector
    await driver.get('http://detectportal.firefox.com/canonical.html');

    // Select username input field, then fill it
    await driver.findElement(By.id(userElementId)).sendKeys(loginEmail);

    // Select password input field, then fill it & submit the form
    await driver.findElement(By.id(passElementId)).sendKeys(loginPass, Key.RETURN);

    // Wait for tab title to match expected success state, or time out in 10 seconds
    await driver.wait(until.titleIs(redirectTitle), 10000);

    // If success, output "Logged In"
    console.log("Logged In");
})();
