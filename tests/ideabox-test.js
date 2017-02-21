var webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver_fx = new webdriver.Builder()
    .forBrowser('firefox')
    .build();

var driver_chr = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

// var driver_saf = new webdriver.Builder()
//     .forBrowser('safari')
//     .build();

testIdeaBox(driver_fx);
testIdeaBox(driver_chr);
// testIdeaBox(driver_saf);

function testIdeaBox (driver) {
  driver.get('https://jbevis.github.io/2DoBox-Pivot/');
  driver.findElement(By.id('title-input')).sendKeys('Test Idea');
  driver.findElement(By.id('body-input')).sendKeys('Test idea body text');
  driver.findElement(By.id('save-button')).click();

  driver.sleep(3000).then(function () {
    driver.findElement(By.className('idea-title')).getText().then(function(title) {
      if (title === 'Test Idea') {
        console.log('Create card title test passed');
      } else {
        console.log('Create card title test failed');
      }
    driver.findElement(By.className('idea-body')).getText().then(function(body) {
      if (body === 'Test idea body text') {
        console.log('Create card body test passed');
      } else {
        console.log('Create card body test failed');
      };
    });
  });
  });

//Check localStorage and persistance. Page reload, compare to 'idea-body'
  driver.navigate().refresh();
  driver.sleep(3000).then(function () {
    driver.findElement(By.className('idea-body')).getText().then(function(body) {
      if (body === 'Test idea body text') {
        console.log('Page reload test Passed');
      } else {
        console.log('Page reload test failed');
      };
    });
  });

//Check delete button. find delete button. click.
  driver.findElement(By.className('delete-button')).click();
  driver.sleep(3000).then(function () {
    driver.findElement(By.className('idea-box-container')).getText().then(function(body) {
      if (body === "") {
        console.log('Delete button test passed');
      } else {
        console.log('Delete button test failed');
      };
    });
  driver.navigate().refresh();
  driver.sleep(3000).then(function () {
    driver.findElement(By.className('idea-box-container')).getText().then(function(body) {
      if (body === "") {
        console.log('Item removed from storage test passed');
      } else {
        console.log('Item removed from storage test failed');
      };
    });
  });
  });







  driver.quit();
}
