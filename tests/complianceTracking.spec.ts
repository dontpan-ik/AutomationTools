import { test, expect, Page } from '@playwright/test';
import ApexCompliance from '../pages/Apex-Compliance';

declare const process: {
  env: {
    GLOBAL_ADMIN_EMAIL?: string;
    GLOBAL_ADMIN_PASS?: string;
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

test('Compliance Tracking - Approve Multiple Violations', async ({ page }) => {
  /* ************* SETTING ************** */
  const CT = new ApexCompliance();
  /* ************* SETTING ************** */

  //const PARTNER = "ADUSA";
  const PARTNER = "SYSCO";
  //const PARTNER = "UNFI CONVENTIONAL";
  
  // SELECT ENVIRONMENT
  await page.goto(CT.CT_QA_ENV);

  // LOGIN TO CEPLE
  await page.locator(CT.ct_login_button).click();
  await page.locator(CT.email_input).fill(process.env.GLOBAL_ADMIN_EMAIL!);
  await page.locator(CT.continue_button).click();
  await page.locator(CT.pass_input).fill(process.env.GLOBAL_ADMIN_PASS!);
  await page.locator(CT.login_submit).click();
  await page.waitForTimeout(10000);

  await page.locator(CT.ct_partner_dropdown).click();
  await page.locator("//*[@id='cdk-overlay-0']/div/div/a[text()=' "+PARTNER+" ']").click();
  await page.waitForTimeout(10000);

});

test('Compliance Imaging - Create a free form PO', async ({ page }) => {
  /* ************* SETTING ************** */
  const CI = new ApexCompliance();
  /* ************* SETTING ************** */

  //const PARTNER = "ADUSA";
  const PARTNER = "AWG";
  const VENDOR = "HARVEST HILL BEVERAGE COMPANY (0008082001)";
  //const PARTNER = "UNFI CONVENTIONAL";
  
  // SELECT ENVIRONMENT
  await page.goto(CI.CI_QA_ENV);

  // LOGIN TO CEPLE
  await page.locator(CI.ci_login_button).click();
  await page.locator(CI.email_input).fill(process.env.GLOBAL_ADMIN_EMAIL!);
  await page.locator(CI.continue_button).click();
  await page.locator(CI.pass_input).fill(process.env.GLOBAL_ADMIN_PASS!);
  await page.locator(CI.login_submit).click();
  await page.waitForTimeout(2000);

  // SELECT PARTNER AND SITE
  await expect(page.locator(CI.ci_partner_select_title)).toBeVisible();
  await page.locator(CI.ci_partner_table).filter({ hasText: PARTNER }).click();
  await expect(page.locator(CI.ci_site_select_title)).toBeVisible();
  await page.locator(CI.ci_site_table).first().click();

  // SELECT AUDIT NOT STARTED
  await expect(page.locator(CI.ci_audit_not_started_title)).toBeVisible();
  await page.locator(CI.ci_audit_not_started_option).first().click();
  
  // NEED TO IMPROVE HERE
  await expect(page.locator(CI.ci_free_form_po_button)).toBeVisible();
  await page.locator(CI.ci_free_form_po_button).click();
  await page.waitForTimeout(2000);

  // FILL OUT FREE FORM PO
  await expect(page.locator(CI.ci_free_form_po_title)).toBeVisible();
  await page.locator(CI.ci_new_po_input).fill("TESTING PO");
  await page.locator(CI.ci_vendor_search_dropdown).fill(VENDOR);
  await page.locator(CI.ci_vendor_search_dropdown).press('ArrowDown');
  await page.locator(CI.ci_vendor_search_dropdown).press('Enter');
  await page.locator(CI.ci_check_in_button).click();
  await page.locator(CI.ci_check_in_button).fill("07/16/2026 02:50 PM");
  await page.locator(CI.ci_check_out_button).fill("07/17/2026 03:50 PM");
  await page.locator(CI.ci_submit_new_po_button).click();
  await page.waitForTimeout(2000);

  await page.locator(CI.ci_select_new_po).click();
  await page.locator(CI.ci_add_violation_button).click();
  await page.locator(CI.ci_violation_options).first().click();
  await page.locator(CI.ci_dock_dropdown).fill("DRY");
  await page.locator(CI.ci_door_dropdown).fill("33");
  await page.locator(CI.ci_upload_photos_button).click();
  await page.waitForTimeout(5000);
  await page.locator(CI.ci_upload_photos_button).setInputFiles('tests/testImages/testImage.jpg');
  await page.waitForTimeout(5000);
});