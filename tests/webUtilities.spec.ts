declare const require: any;
const { writeFileSync } = require('fs');
import { test, expect, Page } from '@playwright/test';
import FacebookLocators  from '../pages/facebook-locators';

function saveTestResultLogsToFile(logEntries: string[], fileName = 'test_results_logs.txt') {
  const content = logEntries.length > 0 ? logEntries.join('\n') : 'No test logs captured.';
  writeFileSync(fileName, content, 'utf8');
}

test('Save img from FB URL', async ({ page }) => {

  // ******** SETTINGS***************************** 
  const total_iterations = 200;
  const current_url = "https://www.facebook.com/photo/?fbid=376352281450339&set=pb.100072267111882.-2207520000";
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