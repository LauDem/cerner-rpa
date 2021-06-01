
const { By } = require('selenium-webdriver/lib/by');
const {Builder} = require('selenium-webdriver');
require('dotenv').config()


var args = process.argv.slice(2);
if (args.length  != 1) throw new Error('1 parameters requested, '+args.length+' given');

let invoice = {};

let invoices = [];



(async function myFunction() {

    let driver = await new Builder().forBrowser('chrome').build();

    await driver.get("https://cerner-61e84.web.app/");

    await driver.manage().window().setRect(784, 824);

    await driver.findElement(By.id("mat-input-0")).click();

    await driver.findElement(By.id("mat-input-0")).sendKeys("accounting@cerner.com");

    await driver.findElement(By.id("mat-input-1")).sendKeys("P@ssw0rd");

    await driver.findElement(By.css(".mat-button-wrapper")).click();

    await driver.findElement(By.css(".myMenu > div:nth-child(2)")).click();

    await driver.manage().setTimeouts( { implicit: 5000 } );

    let rows = await driver.findElements(By.css("body > app-root > app-authenticated > div > div.myComponents > app-invoices > table > tbody > tr"))


    for(let x=1; x< rows.length+1; x++) {

        if(await driver
            .findElement(By
                .xpath("/html/body/app-root/app-authenticated/div/div[3]/app-invoices/table/tbody/tr["+x+"]/td[2]"))
                .getText() 
            != args[0]) continue;

        let number = await driver.findElement(By.xpath("/html/body/app-root/app-authenticated/div/div[3]/app-invoices/table/tbody/tr["+x+"]/td[1]")).getText();

        let issuer = await driver.findElement(By.xpath("/html/body/app-root/app-authenticated/div/div[3]/app-invoices/table/tbody/tr["+x+"]/td[2]")).getText();

        let amount = await driver.findElement(By.xpath("/html/body/app-root/app-authenticated/div/div[3]/app-invoices/table/tbody/tr["+x+"]/td[3]")).getText();

        let currency = await driver.findElement(By.xpath("/html/body/app-root/app-authenticated/div/div[3]/app-invoices/table/tbody/tr["+x+"]/td[4]")).getText();

        let date = await driver.findElement(By.xpath("/html/body/app-root/app-authenticated/div/div[3]/app-invoices/table/tbody/tr["+x+"]/td[5]")).getText();

        let status = await driver.findElement(By.xpath("/html/body/app-root/app-authenticated/div/div[3]/app-invoices/table/tbody/tr["+x+"]/td[6]")).getText();


        invoice = {
            'amount':   amount,
            'currency': currency,
            'number':   number,
            "date":     date,
            "issuer":   issuer,
            "status":   status
        }
    
        invoices.push(invoice);
    
    }

    await driver.findElement(By.css('.logout')).click();

    await driver.quit();

    console.log(JSON.stringify(invoices))
    

})();
  
// console.log("script kicking")