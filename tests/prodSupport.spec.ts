import { test, expect, Page } from '@playwright/test';
import ApexCPLE from '../pages/Apex-CPLE';

// Function to serialize PO constant
function serializePO(poValue: string): { po: string; timestamp: string; serialized: string } {
  return {
    po: poValue,
    timestamp: new Date().toISOString(),
    serialized: `${poValue}_${Date.now()}`
  };
}

test('CPLE - Create New Transaction', async ({ page }) => {
  /* ************* SETTING ************** */
  const CPLE = new ApexCPLE();
  //const dock_option = "SERVICES";
  const dock_option = "FREEZER";
  const poSerialized = serializePO("Auto_TEST");
  const current_PO = poSerialized.serialized;
  /* ************* SETTING ************** */

  // SELECT ENVIRONMENT
  await page.goto(CPLE.QAenv);

  // LOGIN TO CEPLE
  await page.locator(CPLE.main_login_button).click();
  await page.locator(CPLE.email_input).fill(CPLE.COLD_LINK_email);
  await page.locator(CPLE.continue_button).click();
  await page.locator(CPLE.pass_input).fill(CPLE.COLD_LINK_pass);
  await page.locator(CPLE.login_submit).click();

  //VALIDATING RECENT TRANSACTION PAGE
  await expect(page.locator(CPLE.recent_transaction_title)).toBeVisible();
  //VALIDATE NO TRANSACTIONS CASE
  //await expect(page.locator("//app-root/div/div[2]/app-transaction-management/div/app-transaction-table-container/div/app-transaction-table/app-empty-table-container/div/p")).toBeVisible();
  await page.locator(CPLE.new_transaction_button).click();
  await expect(page.locator(CPLE.new_transaction_modal_title)).toBeVisible();

  // CREATING NEW TRANSACTION
  await page.locator(CPLE.nt_vendor_input).fill(current_PO);
  await page.locator(CPLE.nt_po_input).fill(current_PO);
  await page.locator(CPLE.nt_next_button).click();

  await page.locator(CPLE.nt_carrier_search_input).fill("test");
  await page.locator(CPLE.nt_dock_input).click();
  await page.locator('mat-option:has-text("'+dock_option+'")').click();
  await page.locator(CPLE.nt_door_input).fill('101');
  await page.locator(CPLE.nt_pallets_input).fill('101');
  await page.locator(CPLE.nt_cases_input).fill('101');
  await page.locator(CPLE.nt_next_button).click();
  
  await page.locator(CPLE.nt_phone_input).fill('1111111111');
  await page.locator(CPLE.nt_trailer_input).fill('101');
  await page.locator(CPLE.nt_comments_input).fill('TEST');
  await page.locator(CPLE.nt_save_pay_button).click();

  //validate already created PO
  await expect(page.locator(CPLE.nt_payment_title)).toBeVisible();
  await page.locator(CPLE.nt_payment_amount).fill("10.11");
  await page.locator(CPLE.nt_submit_button).click();

  await expect(page.locator(CPLE.recent_transaction_title)).toBeVisible();

  // Wait for transaction to appear in the list
  await page.waitForTimeout(10000);
});

test('CPLE - Create Multiple New Transactions', async ({ page }) => {
  /* ************* SETTING ************** */
  const CPLE = new ApexCPLE();
  const TOTAL_TRANSACTIONS = 10;
  const DOCK_OPTION = "FREEZER"; // for sites: 80005, 80007, 80008
  //const DOCK_OPTION = "SERVICES"; // for sites: 80006
  /* ************* SETTING ************** */
  
  // SELECT ENVIRONMENT
  await page.goto(CPLE.QAenv);

  // LOGIN TO CEPLE
  await page.locator(CPLE.main_login_button).click();
  await page.locator(CPLE.email_input).fill(CPLE.COLD_LINK_email);
  await page.locator(CPLE.continue_button).click();
  await page.locator(CPLE.pass_input).fill(CPLE.COLD_LINK_pass);
  await page.locator(CPLE.login_submit).click();

  //VALIDATING RECENT TRANSACTION PAGE
  await expect(page.locator(CPLE.recent_transaction_title)).toBeVisible();
  //VALIDATE NO TRANSACTIONS CASE
  //await expect(page.locator("//app-root/div/div[2]/app-transaction-management/div/app-transaction-table-container/div/app-transaction-table/app-empty-table-container/div/p")).toBeVisible();
  
  // CREATING MULTIPLE TRANSACTIONS
  for(let j=0;j<TOTAL_TRANSACTIONS;j++){
    const poSerialized = serializePO("Auto_TEST");
    let current_PO = poSerialized.serialized;
    
    await page.locator(CPLE.new_transaction_button).click();
    await expect(page.locator(CPLE.new_transaction_modal_title)).toBeVisible();

    await page.locator(CPLE.nt_vendor_input).fill(current_PO);
    await page.locator(CPLE.nt_po_input).fill(current_PO);
    await page.locator(CPLE.nt_next_button).click();

    await page.locator(CPLE.nt_carrier_search_input).fill("test");
    await page.locator(CPLE.nt_dock_input).click();
    await page.locator('mat-option:has-text("'+DOCK_OPTION+'")').click();
    await page.locator(CPLE.nt_door_input).fill('101');
    await page.locator(CPLE.nt_pallets_input).fill('101');
    await page.locator(CPLE.nt_cases_input).fill('101');
    await page.locator(CPLE.nt_save_pay_button).click();

    //await page.locator(CPLE.nt_phone_input).fill(CPLE.us_phone);
    await page.locator(CPLE.nt_phone_input).fill('1111111111');
    await page.locator(CPLE.nt_trailer_input).fill('101');
    await page.locator(CPLE.nt_comments_input).fill('TEST');
    await page.locator(CPLE.nt_next_button).click();
    
    //validate already created PO
    await page.waitForTimeout(8000);
    //await expect(page.locator(CPLE.nt_payment_title)).toBeVisible();
    await page.locator(CPLE.nt_payment_amount).fill("10.11");
    await page.locator(CPLE.nt_submit_button).click();

    await expect(page.locator(CPLE.recent_transaction_title)).toBeVisible();
    await page.waitForTimeout(5000);
  }
});