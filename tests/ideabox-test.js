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


//Test full page functionality
function testIdeaBox (driver) {
  driver.get('https://jbevis.github.io/2DoBox-Pivot/');


//Check if submit button disabled on page load.
  driver.sleep(3000).then(function () {
    driver.findElement(By.id('save-button')).isEnabled(false);
    if (true) {
      console.log('Button disabled test passed');
    } else {
      console.log('Button disabled test failed');
    };
  })


////Test create card click event
  driver.findElement(By.id('title-input')).sendKeys('Test Idea');
    driver.sleep(2000).then(function () {
      driver.findElement(By.id('save-button')).isEnabled(true);
      if (true) {
        console.log("Button enable test passed");
      } else {
        console.log("Button enable test failed");
      }
    })
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


//Test clear inputs
  driver.findElement(By.id('title-input')).getText().then(function(title) {
    if (title === "") {
      console.log("Clear title field test passed")
    } else {
      console.log("Clear title field test failed")
    }
  });
  driver.findElement(By.id('body-input')).getText().then(function(body) {
    if (body === "") {
      console.log("Clear body field test passed");
    } else {
      console.console.log("Clear body field test failed");
    }
  });


//upvote test. find the upvote button. click.
driver.findElement(By.className('upvote-button')).click();
driver.sleep(3000).then(function () {
  driver.findElement(By.className('current-quality')).getText().then(function (quality) {
    if (quality === "plausible") {
      console.log('Upvote button test passed');
    } else {
      console.log('Upvote button test failed');
    }
  });
});


//downvote test. find the downvote button. click.
  driver.findElement(By.className('downvote-button')).click();
  driver.sleep(3000).then(function () {
    driver.findElement(By.className('current-quality')).getText().then(function (quality) {
      if (quality === "swill") {
        console.log('Downvote button test passed');
      } else {
        console.log('Downvote button test failed');
      }
    });
  });


//Check to see if card content is editable. Find card title and body, send keys, compare
  driver.findElement(By.className('idea-title')).click();
  driver.findElement(By.className('idea-title')).sendKeys('x');
  driver.findElement(By.className('idea-body')).click();
  driver.findElement(By.className('idea-body')).sendKeys('x');
  driver.sleep(4000).then(function () {
    driver.findElement(By.className('idea-title')).getText().then(function (newTitle) {
      if (newTitle === 'Testx Idea') {
        console.log('Title content editable test passed');
      } else {
        console.log('Title content editable test failed');
      };
    });
    driver.findElement(By.className('idea-body')).getText().then(function (newBody) {
      if (newBody === "Test idea body textx") {
        console.log('Body content editable test passed');
      } else {
        console.log('Body content editable test failed');
      };
    });
  });
//
//
//Test search input is returing matching text in cards.
  driver.findElement(By.id('title-input')).sendKeys('Google');
  driver.findElement(By.id('save-button')).click();
  driver.findElement(By.id('search-input')).sendKeys('Google');
  driver.findElement(By.className('idea-title')).getText().then(function (title) {
    if (title === 'Google') {
      console.log('Search input test passed')
    } else {
      console.log('Search input test failed')
    }
  });


  //Check localStorage and persistance. Page reload, compare to 'idea-body'
  driver.navigate().refresh();
  driver.sleep(5000).then(function () {
    driver.findElement(By.className('idea-title')).getText().then(function(title) {
      if (title === 'Google') {
        console.log('Page reload test Passed');
      } else {
        console.log('Page reload test failed');
      };
    });
  });


//Check delete button. find delete button. click.
  driver.findElement(By.className('delete-button')).click();
  driver.sleep(3000).then(function () {
    driver.findElement(By.className('idea-title')).getText().then(function(title) {
      if (title === 'Testx Idea') {
        console.log('Delete button test passed');
      } else {
        console.log('Delete button test failed');
      };
    });


  //Reload to check localStorage after delete.
  driver.navigate().refresh();
  driver.sleep(3000).then(function () {
    driver.findElement(By.className('idea-title')).getText().then(function(title) {
      if (title === "Testx Idea") {
        console.log('Item removed from storage test passed');
      } else {
        console.log('Item removed from storage test failed');
      };
    });
  });
  });

  driver.quit();
}
