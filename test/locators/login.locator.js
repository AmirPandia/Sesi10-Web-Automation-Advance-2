const {By} = require("selenium-webdriver");

const loginLocator = {
    url: 'https://www.saucedemo.com',

    selectors: {
        usernameInput: By.xpath('//*[@id="user-name"]'),
        passwordInput: By.xpath('//*[@id="password"]'),
        loginButton: By.xpath('//*[@id="login-button"]'),
        shoppingCart: By.xpath('//*[@data-test="shopping-cart-link"]'),
        errorMessage: By.xpath('//*[@id="login_button_container"]/div/form/div[3]/h3/button')
    }
}

module.exports = loginLocator;