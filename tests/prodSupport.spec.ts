import { test, expect, Page } from '@playwright/test';
import ApexCPLE from '../pages/Apex-CPLE';

declare const process: {
  env: {
    COLD_LINK_email?: string;
    COLD_LINK_pass?: string;
    [key: string]: string | undefined;
  };
};
// Function to serialize PO constant
function serializePO(poValue: string): { po: string; timestamp: string; serialized: string } {
  return {
    po: poValue,
    timestamp: new Date().toISOString(),
    serialized: `${poValue}_${Date.now()}`
  };
}

test('CPLE - Create New Transaction', async ({ page }) => {
  /* ************* SETTINGS ************** */
  const CPLE = new ApexCPLE(page);
  //const dock_option = "SERVICES";
  const dock_option = "FREEZER";
  const poSerialized = serializePO("Auto_TEST");
  const current_PO = poSerialized.serialized;
  /* ************* SETTINGS ************** */

  // SELECT ENVIRONMENT
  await page.goto(CPLE.QAenv);

  // LOGIN TO CEPLE
  await page.locator(CPLE.main_login_button).click();
  await page.locator(CPLE.email_input).fill(process.env.COLD_LINK_email!);
  await page.locator(CPLE.continue_button).click();
  await page.locator(CPLE.pass_input).fill(process.env.COLD_LINK_pass!);
  await page.locator(CPLE.login_submit).click();

  //VALIDATING RECENT TRANSACTION PAGE
  await expect(page.locator(CPLE.recent_transaction_title)).toBeVisible();
  //VALIDATE NO TRANSACTIONS CASE
  //await expect(page.locator("//app-root/div/div[2]/app-transaction-management/div/app-transaction-table-container/div/app-transaction-table/app-empty-table-container/div/p")).toBeVisible();
  // ADDING ACTION FUNCTION TO CREATE NEW TRANSACTION
  await CPLE.createNewTransaction(current_PO, dock_option);
  // Wait for transaction to appear in the list
  await page.waitForTimeout(10000);
});

test('CPLE - Create Multiple New Transactions', async ({ page }) => {
  /* ************* SETTINGS ************** */
  const CPLE = new ApexCPLE(page);
  const TOTAL_TRANSACTIONS = 100;
  const dock_option = "FREEZER"; // for sites: 80005, 80007, 80008
  //const dock_option = "SERVICES"; // for sites: 80006
  /* ************* SETTINGS ************** */
  
  // SELECT ENVIRONMENT
  await page.goto(CPLE.RCenv);

  // LOGIN TO CEPLE
  await page.locator(CPLE.main_login_button).click();
  await page.locator(CPLE.email_input).fill(process.env.COLD_LINK_email!);
  await page.locator(CPLE.continue_button).click();
  await page.locator(CPLE.pass_input).fill(process.env.COLD_LINK_pass!);
  await page.locator(CPLE.login_submit).click();

  //VALIDATING RECENT TRANSACTION PAGE
  await expect(page.locator(CPLE.recent_transaction_title)).toBeVisible();
  //VALIDATE NO TRANSACTIONS CASE
  //await expect(page.locator("//app-root/div/div[2]/app-transaction-management/div/app-transaction-table-container/div/app-transaction-table/app-empty-table-container/div/p")).toBeVisible();
  
  // CREATING MULTIPLE TRANSACTIONS
  for(let j=0;j<TOTAL_TRANSACTIONS;j++){
    const poSerialized = serializePO("Auto_TEST");
    let current_PO = poSerialized.serialized;
    // ADDING ACTION FUNCTION TO CREATE NEW TRANSACTION
    await CPLE.createTransactionBULK(current_PO, dock_option);
    // Wait for transaction to appear in the list
    await page.waitForTimeout(5000);
  }
});