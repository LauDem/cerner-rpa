
const { By } = require('selenium-webdriver/lib/by');
const {Builder} = require('selenium-webdriver');
require('dotenv').config()

var args = process.argv.slice(2);
if (args.length < 6) throw '6 parameters requested, '+args.length+' given';
console.log(args);

let invoice = {
    issuer: args[0],
    date: args[1],
    amount: args[2],
    currency: args[3],
    number: args[4],
    status: args[5]
};


(async function myFunction() {
    let driver = await new Builder().forBrowser('chrome').build();
    //your code inside this block
    await driver.get("https://cerner-61e84.web.app/")
    await driver.manage().window().setRect(770, 773)
    await driver.findElement(By.id("mat-input-0")).click()
    await driver.findElement(By.id("mat-input-0")).sendKeys("accounting@cerner.com")
    await driver.findElement(By.id("mat-input-1")).sendKeys("P@ssw0rd")
    await driver.findElement(By.css(".mat-button-wrapper")).click()
    await driver.findElement(By.css(".myMenu > div:nth-child(2)")).click()
    await driver.findElement(By.id("mat-input-2")).click()
    await driver.findElement(By.id("mat-input-2")).sendKeys(invoice.number)
    await driver.findElement(By.id("mat-input-3")).click()
    await driver.findElement(By.id("mat-input-3")).sendKeys(invoice.issuer)
    await driver.findElement(By.id("mat-input-4")).click()
    await driver.findElement(By.id("mat-input-4")).sendKeys(invoice.date)
    await driver.findElement(By.id("mat-input-5")).click()
    await driver.findElement(By.id("mat-input-5")).sendKeys(invoice.amount)
    await driver.findElement(By.id("mat-input-6")).click()
    await driver.findElement(By.id("mat-input-6")).sendKeys(invoice.currency)
    await driver.findElement(By.css(".mat-button-wrapper")).click()
        //await driver.eval(commands[i].command(commands[i].target))
    

})();
  
