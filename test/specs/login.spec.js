const {Builder, By} = require ("selenium-webdriver")
const LoginPage = require ("../pages/login.page")
const CommonPage = require("../pages/common.page")

describe ("open sauce demo", function () {
    let driver
    let login
    let common
    
    this.timeout(10000)

    beforeEach (async function () {
        driver = await new Builder()
            .forBrowser("chrome")
            .build();

        login = new LoginPage(driver)
        common = new CommonPage(driver)
        await login.openBrowser()
    })

    afterEach (async function () {
        await driver.quit()
    })

    it ("Should Login With Standard User", async function () {
        await login.inputUsername("standard_user")
        await login.inputPassword("secret_sauce")
        await login.clickLoginButton()
        await login.isShoppingCartVisible()

        await common.fullScreenshot("Should Login With Standard User")
    })

    it ("Shouldn't Login With Locked Out User", async function () {
        await login.inputUsername("locked_out_user")
        await login.inputPassword("secret_sauce")
        await login.clickLoginButton()
        await login.isErrorMessageVisible()

        await common.elementScreenshot(By.xpath('//*[@id="login_button_container"]/div/form/div[3]/h3/button'), "Shouldn't Login With Locked Out User")
    })
})