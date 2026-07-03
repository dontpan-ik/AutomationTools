import { test, expect, Page } from '@playwright/test';
import ApexCompliance from '../pages/Apex-Compliance';

// Function to serialize PO constant
function serializePO(poValue: string): { po: string; timestamp: string; serialized: string } {
  return {
    po: poValue,
    timestamp: new Date().toISOString(),
    serialized: `${poValue}_${Date.now()}`
  };
}

test('Compliance Tracking - Approve Multiple Violations', async ({ page }) => {
  /* ************* SETTING ************** */
  const CT = new ApexCompliance();
  /* ************* SETTING ************** */

  //const PARTNER = "ADUSA";
  const PARTNER = "SYSCO";
  //const PARTNER = "UNFI CONVENTIONAL";
  
  // SELECT ENVIRONMENT
  await page.goto(CT.DEV_ENV);

  // LOGIN TO CEPLE
  await page.locator(CT.login_button).click();
  await page.locator(CT.email_input).fill(CT.global_admin_email);
  await page.locator(CT.continue_button).click();
  await page.locator(CT.pass_input).fill(CT.global_admin_pass)
  await page.locator(CT.login_submit).click();
  await page.waitForTimeout(10000);

  await page.locator(CT.partner_dropdown).click();
  await page.locator("//*[@id='cdk-overlay-0']/div/div/a[text()=' "+PARTNER+" ']").click();
  await page.waitForTimeout(10000);

});