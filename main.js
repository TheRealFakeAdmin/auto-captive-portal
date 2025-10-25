const firefox = require("selenium-webdriver/firefox");
const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

const DEBUG = false;

if (!DEBUG) console.debug = () => {};

// Load environment variables from .env
require("dotenv").config();

// Setup constants with needed env variables
const loginEmail = process.env["email"],
  loginPass = process.env["passwd"],
  userElementId = process.env["user-id"],
  passElementId = process.env["pass-id"],
  redirectTitle = process.env["redirect-title"];

(async () => {
  try {
    // Configure Firefox Options
    const firefoxOptions = new firefox.Options();
    firefoxOptions.addArguments("--headless");

    // Open a headless Firefox instance
    const driver = await new Builder()
      .forBrowser(Browser.FIREFOX)
      .setFirefoxOptions(firefoxOptions)
      .build();

    try {
      // Navigate to Firefox's canonical portal detector
      await driver.get("http://detectportal.firefox.com/success.txt");

      // Check if already connected
      // console.debug(await driver.getPageSource());

      try {
        // Select username input field, then fill it
        await driver.findElement(By.id(userElementId)).sendKeys(loginEmail);

        // Select password input field, then fill it & submit the form
        await driver
          .findElement(By.id(passElementId))
          .sendKeys(loginPass, Key.RETURN);

        // Wait for tab title to match expected success state, or time out in 10 seconds
        await driver.wait(until.titleIs(redirectTitle), 10000);

        // If success, output "Logged In"
        console.log("Logged In");
      } catch (err) {
        // If login-step failed, output "Failed to Log In"
        console.log("Failed to Log In");
        console.debug(err);
      }
    } catch (err) {
      console.log("Failed to navigate to detect-portal");
      console.debug(err);
    } finally {
      await driver.quit();
    }
  } catch (err) {
    console.error("Failed to initiate headless browser");
    console.error(err);
  }
})();
