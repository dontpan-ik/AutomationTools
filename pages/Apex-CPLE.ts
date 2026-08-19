import { expect, Page } from '@playwright/test';

class ApexCPLE{

    public QAenv = "https://qa-stockholm.capstonelogistics.com/en/";
    public RCenv = "https://rc-stockholm.capstonelogistics.com/en/";
    public PPenv = "https://pp-stockholm.capstonelogistics.com/en/";
    public PROD = "https://pay.capstonelogistics.com/en/";

    public main_login_button = "//app-root/div/div[2]/app-landing-page/div/div/div[2]/app-button/button/span[4]";
    public email_input = '//*[@id="signInName"]';
    public pass_input = '//*[@id="password"]';
    public continue_button = '//*[@id="continue"]';
    public login_submit = '//*[@id="next"]';
    public us_phone = '2146766148';

    public recent_transaction_title = "//app-root/div/div[2]/app-transaction-management/div/app-transaction-table-container/div/app-table-header/div/h1";
    public new_transaction_button = "//app-root/div/div[2]/app-transaction-management/div/app-transaction-table-container/div/app-table-header/div/div/button[2]/span[2]/span[2]";
    public new_transaction_modal_title = '//div/div/app-transaction-management-modal/app-dialog-layout/section/div[1]/div/h1';

    public nt_vendor_input = '//div/div/div/div[2]/mat-form-field[1]/div[1]/div[2]/div/input';
    public nt_po_input = '//div/div/div/div[2]/mat-form-field[2]/div[1]/div[2]/div/input';
    public nt_next_button = '//div/div/app-transaction-management-modal/app-dialog-layout/section/div[3]/app-buttons-layout/div/div[1]/app-button[2]/button';

    public nt_carrier_search_input = '//div[2]/div[2]/div/mat-dialog-container/div/div/app-transaction-management-modal/app-dialog-layout/section/div[2]/form/mat-tab-group/div/mat-tab-body[2]/div/div/div[2]/mat-form-field/div[1]/div[2]/div/input';
    public nt_dock_input = '//div[2]/div[2]/div/mat-dialog-container/div/div/app-transaction-management-modal/app-dialog-layout/section/div[2]/form/mat-tab-group/div/mat-tab-body[2]/div/div/div[3]/div[1]/mat-form-field/div[1]/div[2]/div/input';
    public nt_door_input = '//div[2]/div[2]/div/mat-dialog-container/div/div/app-transaction-management-modal/app-dialog-layout/section/div[2]/form/mat-tab-group/div/mat-tab-body[2]/div/div/div[3]/div[2]/mat-form-field/div[1]/div[2]/div/input';
    public nt_pallets_input = '//div[2]/div[2]/div/mat-dialog-container/div/div/app-transaction-management-modal/app-dialog-layout/section/div[2]/form/mat-tab-group/div/mat-tab-body[2]/div/div/div[4]/div[1]/mat-form-field/div[1]/div[2]/div/input';
    public nt_cases_input = '//div[2]/div[2]/div/mat-dialog-container/div/div/app-transaction-management-modal/app-dialog-layout/section/div[2]/form/mat-tab-group/div/mat-tab-body[2]/div/div/div[4]/div[2]/mat-form-field/div[1]/div[2]/div/input';
    public nt_save_pay_button = '//div/div/app-transaction-management-modal/app-dialog-layout/section/div[3]/app-buttons-layout/div/div[1]/app-button[2]/button';
    
    public nt_phone_input = '//div[2]/div[2]/div/mat-dialog-container/div/div/app-transaction-management-modal/app-dialog-layout/section/div[2]/form/mat-tab-group/div/mat-tab-body[3]/div/div/div[1]/mat-form-field/div[1]/div[2]/div/input';
    public nt_trailer_input = '//div[2]/div[2]/div/mat-dialog-container/div/div/app-transaction-management-modal/app-dialog-layout/section/div[2]/form/mat-tab-group/div/mat-tab-body[3]/div/div/div[2]/mat-form-field/div[1]/div[2]/div/input';
    public nt_comments_input = '//div[2]/div[2]/div/mat-dialog-container/div/div/app-transaction-management-modal/app-dialog-layout/section/div[2]/form/mat-tab-group/div/mat-tab-body[3]/div/div/div[3]/mat-form-field/div[1]/div[2]/div/textarea';
    

    public nt_payment_title = '//div/div/div[2]/mat-label';
    public nt_payment_amount = '//div[2]/div[2]/div/mat-dialog-container/div/div/app-transaction-management-modal/app-dialog-layout/section/div[2]/form/mat-tab-group/div/mat-tab-body[4]/div/div/mat-form-field/div[1]/div[2]/div/input';
    public nt_submit_button = '//div/div/app-transaction-management-modal/app-dialog-layout/section/div[3]/app-buttons-layout/div/div[1]/app-button[2]/button';
    
    constructor(private page: Page) {}
    
    async createNewTransaction(current_PO: string, dock_option: string) {
        //VALIDATING RECENT TRANSACTION PAGE
          await expect(this.page.locator(this.recent_transaction_title)).toBeVisible();
          //VALIDATE NO TRANSACTIONS CASE
          //await expect(this.page.locator("//app-root/div/div[2]/app-transaction-management/div/app-transaction-table-container/div/app-transaction-table/app-empty-table-container/div/p")).toBeVisible();
          await this.page.locator(this.new_transaction_button).click();
          await expect(this.page.locator(this.new_transaction_modal_title)).toBeVisible();
        
          // CREATING NEW TRANSACTION
          await this.page.locator(this.nt_vendor_input).fill(current_PO);
          await this.page.locator(this.nt_po_input).fill(current_PO);
          await this.page.locator(this.nt_next_button).click();
        
          await this.page.locator(this.nt_carrier_search_input).fill("test");
          await this.page.locator(this.nt_dock_input).click();
          await this.page.locator('mat-option:has-text("'+dock_option+'")').click();
          await this.page.locator(this.nt_door_input).fill('101');
          await this.page.locator(this.nt_pallets_input).fill('101');
          await this.page.locator(this.nt_cases_input).fill('101');
          await this.page.locator(this.nt_next_button).click();
          
          await this.page.locator(this.nt_phone_input).fill('1111111111');
          await this.page.locator(this.nt_trailer_input).fill('101');
          await this.page.locator(this.nt_comments_input).fill('TEST');
          await this.page.locator(this.nt_save_pay_button).click();
        
          //validate already created PO
          await expect(this.page.locator(this.nt_payment_title)).toBeVisible();
          await this.page.locator(this.nt_payment_amount).fill("10.11");
          await this.page.locator(this.nt_submit_button).click();
        
          await expect(this.page.locator(this.recent_transaction_title)).toBeVisible();
    }

    async createTransactionBULK(current_PO: string, dock_option: string) {

        await this.page.locator(this.new_transaction_button).click();
        await expect(this.page.locator(this.new_transaction_modal_title)).toBeVisible();
        
        await this.page.locator(this.nt_vendor_input).fill(current_PO);
        await this.page.locator(this.nt_po_input).fill(current_PO);
        await this.page.locator(this.nt_next_button).click();
        
        await this.page.locator(this.nt_carrier_search_input).fill("test");
        await this.page.locator(this.nt_dock_input).click();
        await this.page.locator('mat-option:has-text("'+dock_option+'")').click();
        await this.page.locator(this.nt_door_input).fill('101');
        await this.page.locator(this.nt_pallets_input).fill('101');
        await this.page.locator(this.nt_cases_input).fill('101');
        await this.page.locator(this.nt_save_pay_button).click();

        await this.page.locator(this.nt_phone_input).fill('1111111111');
        await this.page.locator(this.nt_trailer_input).fill('101');
        await this.page.locator(this.nt_comments_input).fill('TEST');
        await this.page.locator(this.nt_next_button).click();
    
        //validate already created PO
        await this.page.waitForTimeout(8000);
        //await expect(this.page.locator(this.nt_payment_title)).toBeVisible();
        await this.page.locator(this.nt_payment_amount).fill("10.11");
        await this.page.locator(this.nt_submit_button).click();

        await expect(this.page.locator(this.recent_transaction_title)).toBeVisible();
        //await this.page.waitForTimeout(5000);
    }
}

function serializePO(poValue: string): { po: string; timestamp: string; serialized: string } {
  return {
    po: poValue,
    timestamp: new Date().toISOString(),
    serialized: `${poValue}_${Date.now()}`
  };
}

export default ApexCPLE;