const {By, until} = require ("selenium-webdriver")
const loginLocator = require ("../locators/login.locator")
const assert = require ("assert")

class LoginPage {
    constructor (driver) {
        this.driver = driver;

    }

    async openBrowser (){
        await this.driver.get(loginLocator.url);
        await this.driver.wait( async () => {
            const url = await this.driver.getCurrentUrl();
            return url ===loginLocator.url; 
        }, 5000).catch(() => {
        })
    }

    async inputUsername (username){
        const inputUsername = await this.driver.findElement(loginLocator.selectors.usernameInput)
        await inputUsername.sendKeys(username)
    }   

    async inputPassword (password){
        const inputPassword = await this.driver.findElement(loginLocator.selectors.passwordInput)
        await inputPassword.sendKeys(password)
    } 

    async clickLoginButton (){
        const loginButton = await this.driver.findElement(loginLocator.selectors.loginButton)
        await loginButton.click()
    }

    async isShoppingCartVisible() {
        const shoppingCart = await this.driver.findElement(loginLocator.selectors.shoppingCart);
        return shoppingCart.isDisplayed();
    }

    async isErrorMessageVisible() {
        await this.driver.wait(
            until.elementLocated(loginLocator.selectors.errorMessage),
            5000
        );

        const errorMessage = await this.driver.findElement(By.css('[data-test="error"]'));
        const actualMessage = await errorMessage.getText();

        assert.strictEqual(
            actualMessage,
            "Epic sadface: Sorry, this user has been locked out.",
            `Pesan error tidak sesuai! Expected: "Epic sadface: Sorry, this user has been locked out.", tapi dapetnya: "${actualMessage}"`
        )
    }
}

module.exports = LoginPage;