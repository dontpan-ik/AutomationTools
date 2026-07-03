import { test, expect, Page } from '@playwright/test';
import FacebookLocators  from '../pages/facebook-locators';

test('Save img from FB URL', async ({ page }) => {

  // ******** SETTINGS***************************** 
  const total_iterations = 200;
  const current_url = "https://www.facebook.com/photo.php?fbid=1339599281525937&set=pb.100064276321358.-2207520000";
  const FBpage = new FacebookLocators(page);

  // ********* END SETTINGS *************************
  await page.goto(current_url);
  try{
    //LOGIN TO FACEBOOK
    await FBpage.login(FBpage.fb_email, FBpage.fb_pass);
    // SELECTING IMAGES ON THE GALLERY
    for(var i=0;i<total_iterations;i++){
      // GETTING CURRENT IMAGE SRC
      var img_url = await page.locator(FBpage.current_img).getAttribute("src");
      //await expect(page.locator(FBpage.img_display)).toBeVisible();
      console.log(img_url);
      // SELECTING NEXT IMAGE
      await FBpage.selectNextImage();
      await page.waitForTimeout(1000);
    }
    // GETTING LAST IMAGE URL
    const current_page = page.url();
    console.log(current_page);
  } catch(error){
    console.log(error);
    const current_page = page.url();
    console.log("Last URL: "+current_page);
  }

  // Save all console logs to a txt file
  //writeFileSync('fb_console_logs.txt', consoleLogs.join('\n'));
});