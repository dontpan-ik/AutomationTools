import { test, expect, Page } from '@playwright/test';
import ApexTime from '../pages/Apex-Time-app';

test('Apex Time - Enter Next Time Punch', async ({ page }) => {

  // ********** SETTINGS *******************
  const site = "11";
  const TimeApp = new ApexTime();
  //const associate_name = "";
  // ********** END SETTINGS ***************

  // LOGIN IN TO APEX TIME
  await page.goto(TimeApp.time_app_QA);
  await page.locator(TimeApp.email_input).fill(process.env.APEX_EMAIL!);
  await page.locator(TimeApp.pass_input).fill(process.env.APEX_PASS!);
  await page.locator(TimeApp.login_button).click();
  //  VALIDATE PAGE DISPLAYMNET BY DATE HEADER
  await expect(page.locator(TimeApp.date_range_header)).toBeVisible();

  // SEARCHING FOR A NEW SITE
  await page.locator(TimeApp.site_dropdown).click();
  await expect(page.locator(TimeApp.site_search_input)).toBeVisible();
  await page.locator(TimeApp.site_search_input).fill(site);
  await page.locator(TimeApp.site_search_result).click();
  await page.waitForTimeout(1000);

  // ADDING TIME PUNCH
  await page.locator(TimeApp.add_timePunch_button).click();
  await expect(page.locator(TimeApp.add_timePunch_header)).toContainText("Associate Time Punch");

  // SELECTING FIRST ASSOCIATE NAME
  await page.locator(TimeApp.associate_dropdown).selectOption('3: Object');

  // SETTING ASSOCIATE INFORMATION
  const associate_name = await page.locator("//app-root/app-layout/section/app-punch-form/app-card/form/fieldset/label[1]/select").innerText();
  const timeClock_options = await page.locator("//app-root/app-layout/section/app-punch-form/app-card/form/fieldset/label[2]/select").innerText();
  const workfunction_value = await page.locator("//app-root/app-layout/section/app-punch-form/app-card/form/fieldset/label[3]/select").innerText();
  console.log("CURRENT ASSOCIATE: "+associate_name);
  console.log("CURRENT WORK FUNCTION: "+workfunction_value);
  //console.log("CURRENT TIME CLOCK OPTION: "+timeClock_options);

  if(workfunction_value.length > 0){
    // SUBMITTING TIME PUNCH
    if(await page.locator(TimeApp.submit_timePunch_button).isDisabled()){
      const message = await page.locator(TimeApp.timePunch_error_message).allInnerTexts();
      console.log(message);
    }else{
      console.log("Entering: "+timeClock_options+" time punch for associate: "+associate_name);
      
      await page.waitForTimeout(1999)
      await page.locator(TimeApp.submit_timePunch_button).click();
    }
  }else{
    if( timeClock_options.includes("Clock In")){
      console.log("NO WORK FUNCTION ASSIGNED TO: "+associate_name+" - CANNOT CLOCK IN");
    }else{
      console.log("Entering: "+timeClock_options+" time punch for associate: "+associate_name);
      await page.waitForTimeout(1999)
      await page.locator(TimeApp.submit_timePunch_button).click();
    }
  }
  await page.waitForTimeout(1999);
});

test('Apex Time - Clock In All Associates', async ({ page }) => {

  // ********** SETTINGS *******************
  //const site = "50082"; // SITE TO TEST CLOCK IN
  const site = "11";
  const TimeApp = new ApexTime();
  const associate_name = "";
  var continue_clockin = true;
  var iterator =0;
  // ********** END SETTINGS ***************

  // LOGIN IN TO APEX TIME
  await page.goto(TimeApp.time_app_QA);
  await page.locator(TimeApp.email_input).fill(process.env.APEX_EMAIL!);
  await page.locator(TimeApp.pass_input).fill(process.env.APEX_PASS!);
  await page.locator(TimeApp.login_button).click();
  //  VALIDATE PAGE DISPLAYMNET BY DATE HEADER
  await expect(page.locator(TimeApp.date_range_header)).toBeVisible();

  // SEARCHING FOR A NEW SITE
  await page.locator(TimeApp.site_dropdown).click();
  await expect(page.locator(TimeApp.site_search_input)).toBeVisible();
  await page.locator(TimeApp.site_search_input).fill(site);
  await page.locator(TimeApp.site_search_result).click();
  await page.waitForTimeout(1000);

  //await page.locator(TimeApp.associate_dropdown).click();
  await page.locator(TimeApp.add_timePunch_button).click();
  await page.locator(TimeApp.associate_dropdown).click();
  await page.waitForTimeout(1000);
  //var total_associates = await page.locator(TimeApp.associate_dropdown_options).count();
  var total_associates = await page.locator(TimeApp.associate_dropdown_options).all();
  console.log("TOTAL ASSOCIATES FOUND: "+total_associates.length);
  await page.locator(TimeApp.timePunch_cancel_button).click();
  await page.waitForTimeout(1000);

  // ITERATING THROUGH ASSOCIATES TO CLOCK IN
  do{
    // ADDING TIME PUNCH
    await page.locator(TimeApp.add_timePunch_button).click();
    await expect(page.locator(TimeApp.add_timePunch_header)).toContainText("Associate Time Punch");

    //Using 'selectOption' methond to select associate - THIS CAN BE IMPROVED
    await page.locator(TimeApp.associate_dropdown).selectOption(iterator+': Object');
    // Validate if WORK FUNCTION ITS EMPTY
    const workfunction_value = await page.locator(TimeApp.workFunction_dropdown).allInnerTexts();
    console.log("CURRENT WORK FUNCTION: "+workfunction_value);

    if(workfunction_value.length > 0){
      // SUBMITTING TIME PUNCH
      if(await page.locator(TimeApp.submit_timePunch_button).isDisabled()){
        //const message = await page.locator(TimeApp.timePunch_error_message);
        console.log("NO WORK FUNCTION ASSIGNED - CANNOT CLOCK IN");
        await page.locator(TimeApp.timePunch_cancel_button).click();
      }else{
        console.log("CLOCKING IN ASSOCIATE...");
        await page.locator(TimeApp.submit_timePunch_button).click();
      }
    }
    await page.waitForTimeout(1999);

    // STOP CONDITION FOR THE LOOP
    iterator++;

    }while(iterator!=(total_associates.length));
});

test('Apex Time - Meal Break Start/End', async ({ page }) => {
     // ********** SETTINGS *******************
  //const site = "50082"; // SITE TO TEST CLOCK IN
  const site = "11";
  const TimeApp = new ApexTime();
  const associate_name = "";
  var iterator =0;
  // ********** END SETTINGS ***************

  // LOGIN IN TO APEX TIME
  await page.goto(TimeApp.time_app_QA);
  await page.locator(TimeApp.email_input).fill(process.env.APEX_EMAIL!);
  await page.locator(TimeApp.pass_input).fill(process.env.APEX_PASS!);
  await page.locator(TimeApp.login_button).click();
  //  VALIDATE PAGE DISPLAYMNET BY DATE HEADER
  await expect(page.locator(TimeApp.date_range_header)).toBeVisible();

  // SEARCHING FOR A NEW SITE
  await page.locator(TimeApp.site_dropdown).click();
  await expect(page.locator(TimeApp.site_search_input)).toBeVisible();
  await page.locator(TimeApp.site_search_input).fill(site);
  await page.locator(TimeApp.site_search_result).click();
  await page.waitForTimeout(1000);

  //await page.locator(TimeApp.associate_dropdown).click();
  await page.locator(TimeApp.add_timePunch_button).click();
  await page.locator(TimeApp.associate_dropdown).click();
  await page.waitForTimeout(1000);
  //var total_associates = await page.locator(TimeApp.associate_dropdown_options).count();
  var total_associates = await page.locator(TimeApp.associate_dropdown_options).all();
  console.log("TOTAL ASSOCIATES FOUND: "+total_associates.length);
  await page.locator(TimeApp.timePunch_cancel_button).click();
  await page.waitForTimeout(1000);

  // ITERATING THROUGH ASSOCIATES TO CLOCK IN
  do{
    // ADDING TIME PUNCH
    await page.locator(TimeApp.add_timePunch_button).click();
    await expect(page.locator(TimeApp.add_timePunch_header)).toContainText("Associate Time Punch");

    //Using 'selectOption' methond to select associate - THIS CAN BE IMPROVED
    await page.locator(TimeApp.associate_dropdown).selectOption(iterator+': Object');
    // Validate if WORK FUNCTION ITS EMPTY
    const workfunction_value = await page.locator(TimeApp.workFunction_dropdown).allInnerTexts();
    console.log("CURRENT WORK FUNCTION: "+workfunction_value);

    if(await page.locator(TimeApp.submit_timePunch_button).isDisabled()){
        //const message = await page.locator(TimeApp.timePunch_error_message);
        console.log("NO WORK FUNCTION ASSIGNED - CANNOT CLOCK IN");
        await page.locator(TimeApp.timePunch_cancel_button).click();
      }else{
        console.log("CLOCKING IN ASSOCIATE...");
        await page.locator(TimeApp.submit_timePunch_button).click();
      }
    
    await page.waitForTimeout(1999);
    //await page.locator(TimeApp.submit_timePunch_button).click();

    // STOP CONDITION FOR THE LOOP
    iterator++;

    }while(iterator!=(total_associates.length));
});


test('Apex Time - Clock Out', async ({ page }) => {
     // ********** SETTINGS *******************
  const site = "10";
  const TimeApp = new ApexTime();
  const associate_name = "";
  var iterator =0;
  // ********** END SETTINGS ***************

  // LOGIN IN TO APEX TIME
  await page.goto(TimeApp.time_app_QA);
  await page.locator(TimeApp.email_input).fill(process.env.APEX_EMAIL!);
  await page.locator(TimeApp.pass_input).fill(process.env.APEX_PASS!);
  await page.locator(TimeApp.login_button).click();
  //  VALIDATE PAGE DISPLAYMNET BY DATE HEADER
  await expect(page.locator(TimeApp.date_range_header)).toBeVisible();

  // SEARCHING FOR A NEW SITE
  await page.locator(TimeApp.site_dropdown).click();
  await expect(page.locator(TimeApp.site_search_input)).toBeVisible();
  await page.locator(TimeApp.site_search_input).fill(site);
  await page.locator(TimeApp.site_search_result).click();
  await page.waitForTimeout(1000);

  await page.locator(TimeApp.add_timePunch_button).click();
  await page.locator(TimeApp.associate_dropdown).click();
  await page.waitForTimeout(1000);
  //var total_associates = await page.locator(TimeApp.associate_dropdown_options).count();
  var total_associates = await page.locator(TimeApp.associate_dropdown_options).all();
  console.log("TOTAL ASSOCIATES FOUND: "+total_associates.length);
  await page.locator(TimeApp.timePunch_cancel_button).click();
  await page.waitForTimeout(1000);

  // ITERATING THROUGH ASSOCIATES TO CLOCK IN
  do{
    // ADDING TIME PUNCH
    await page.locator(TimeApp.add_timePunch_button).click();
    await expect(page.locator(TimeApp.add_timePunch_header)).toContainText("Associate Time Punch");

    //Using 'selectOption' methond to select associate - THIS CAN BE IMPROVED
    await page.locator(TimeApp.associate_dropdown).selectOption(iterator+': Object');
    // Validate if WORK FUNCTION ITS EMPTY
    const workfunction_value = await page.locator(TimeApp.workFunction_dropdown).allInnerTexts();
    console.log("CURRENT WORK FUNCTION: "+workfunction_value);

    if(await page.locator(TimeApp.submit_timePunch_button).isDisabled()){
        //const message = await page.locator(TimeApp.timePunch_error_message);
        console.log("NO WORK FUNCTION ASSIGNED - CANNOT CLOCK IN");
        await page.locator(TimeApp.timePunch_cancel_button).click();
      }else{
        console.log("CLOCKING IN ASSOCIATE...");
        await page.locator(TimeApp.time_clock_options).selectOption(2 +': Object');
      }
    
    await page.waitForTimeout(1999);
    iterator++;

    }while(iterator!=(total_associates.length));
});