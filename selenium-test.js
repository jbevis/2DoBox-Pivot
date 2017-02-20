var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver_fx = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

var driver_saf = new webdriver.Builder()
    .forBrowser('safari')
    .build();

newIdea(driver_fx);
newIdea(driver_chr);
newIdea(driver_saf);

function newIdea (driver) {
  driver.get('file:///Users/JackBevis/Turing/mod1/2Do-Box-Pivot/index.html');
  driver.findElement(By.id('title-input')).sendKeys('Test Idea');
  driver.findElement(By.id('body-input')).sendKeys('Test idea body text');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function () {
    driver.findElement(By.className('idea-title')).getText().then(function(title) {
    if (title === 'Test Idea') {
      console.log('Test Passed')
    } else {
      console.log('Test Failed')
      }
    });
  });


  driver.quit();
}
