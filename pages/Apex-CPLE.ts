class ApexCPLE{

    public QAenv = "https://qa-stockholm.capstonelogistics.com/en/";
    public RCenv = "https://rc-stockholm.capstonelogistics.com/en/";
    public PPenv = "https://pp-stockholm.capstonelogistics.com/en/";
    public PROD = "https://pay.capstonelogistics.com/en/";

    public main_login_button = "//app-root/div/div[2]/app-landing-page/div/div/div[2]/app-button/button/span[4]";
    public email_input = '//*[@id="signInName"]';
    public pass_input = '//*[@id="password"]';
    public email_felip = "";
    public pass_felip = "";
    public COLD_LINK_email = "";
    public COLD_LINK_pass = "";
    public PROD_TEST_PARTNER_email = "";
    public PROD_TEST_PARTNER_pass = "";
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

}

export default ApexCPLE;