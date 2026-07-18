declare const require: any;

const { writeFileSync } = require('fs');
import { test, expect, Page } from '@playwright/test';
import FacebookLocators  from '../pages/facebook-locators';

declare const process: {
  env: {
    FB_EMAIL?: string;
    FB_PASS?: string;
    [key: string]: string | undefined;
  };
};

function saveTestResultLogsToFile(logEntries: string[], fileName = 'test_results_logs.txt') {
  const content = logEntries.length > 0 ? logEntries.join('\n') : 'No test logs captured.';
  writeFileSync(fileName, content, 'utf8');
}

test('Save img from FB URL', async ({ page }) => {

  // ******** SETTINGS***************************** 
  const total_iterations = 200;
  const current_url = "https://www.facebook.com/photo/?fbid=5530006667094366&set=pb.100072267111882.-2207520000";
  const FBpage = new FacebookLocators(page);
  const logEntries: string[] = [];

  const addLog = (message: unknown) => {
    const text = typeof message === 'string' ? message : JSON.stringify(message);
    //const entry = `[${new Date().toISOString()}] ${text}`;
    const entry = text;
    logEntries.push(entry);
    console.log(message);
  };

  page.on('console', (msg) => {
    logEntries.push(`[${new Date().toISOString()}] [${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', (error) => {
    addLog(`Page error: ${error.message}`);
  });

  // ********* END SETTINGS *************************
  await page.goto(current_url);
  try{
    //LOGIN TO FACEBOOK
    await FBpage.login(process.env.FB_EMAIL!, process.env.FB_PASS!);
    // SELECTING IMAGES ON THE GALLERY
    for(var i=0;i<total_iterations;i++){
      // GETTING CURRENT IMAGE SRC
      var img_url = await page.locator(FBpage.current_img).getAttribute("src");
      //await expect(page.locator(FBpage.img_display)).toBeVisible();
      addLog(img_url);
      // SELECTING NEXT IMAGE
      await FBpage.selectNextImage();
      await page.waitForTimeout(1000);
    }
    // GETTING LAST IMAGE URL
    const current_page = page.url();
    addLog(current_page);
  } catch(error){
    addLog(`Error: ${error}`);
    const current_page = page.url();
    addLog(current_page);
  } finally {
    saveTestResultLogsToFile(logEntries);
  }
});


test('Save img from FB URL BACK', async ({ page }) => {

  // ******** SETTINGS***************************** 
  const total_iterations = 200;
  const current_url = "https://www.facebook.com/photo/?fbid=2039550383027028&set=pb.100064529868507.-2207520000";
  const FBpage = new FacebookLocators(page);
  const logEntries: string[] = [];

  const addLog = (message: unknown) => {
    const text = typeof message === 'string' ? message : JSON.stringify(message);
    //const entry = `[${new Date().toISOString()}] ${text}`;
    const entry = text;
    logEntries.push(entry);
    console.log(message);
  };

  page.on('console', (msg) => {
    logEntries.push(`[${new Date().toISOString()}] [${msg.type()}] ${msg.text()}`);
  });

  page.on('pageerror', (error) => {
    addLog(`Page error: ${error.message}`);
  });

  // ********* END SETTINGS *************************
  await page.goto(current_url);
  try{
    //LOGIN TO FACEBOOK
    await FBpage.login(process.env.FB_EMAIL!, process.env.FB_PASS!);
    // SELECTING IMAGES ON THE GALLERY
    for(var i=0;i<total_iterations;i++){
      // GETTING CURRENT IMAGE SRC
      var img_url = await page.locator(FBpage.current_img).getAttribute("src");
      //await expect(page.locator(FBpage.img_display)).toBeVisible();
      addLog(img_url);
      // SELECTING NEXT IMAGE
      await FBpage.selectPrevImage();
      await page.waitForTimeout(1000);
    }
    // GETTING LAST IMAGE URL
    const current_page = page.url();
    addLog(current_page);
  } catch(error){
    addLog(`Error: ${error}`);
    const current_page = page.url();
    addLog(current_page);
  } finally {
    saveTestResultLogsToFile(logEntries);
  }
});

test('Save img from ING URL', async ({ page }) => {

  // ******** SETTINGS***************************** 
  const total_iterations = 200;
  const current_url = "https://www.instagram.com/muze_photography/";
  //const FBpage = new FacebookLocators(page);
  //const logEntries: string[] = [];
  await page.goto(current_url);

  await page.locator('//body/div[4]/div[2]/div/div[1]/div/div[2]/div/div/div/div/div[2]/div/div[2]/div[2]/div/div').click();
  await page.locator('//*[@id="login_form"]/div/div[1]/div/div[5]/div/div/div/div[1]').click();
  await page.locator('//*[@id="_R_1h6kqsqppb6amH1_"]').fill('hokutonoken@live.com.mx');
  await page.locator('//*[@id="_R_1hmkqsqppb6amH1_"]').fill('nbh93y');
  await page.waitForTimeout(5000);
  await page.locator('//*[@id="login_form"]/div/div[1]/div/div[3]/div/div').click();
  await page.waitForTimeout(150000);
});