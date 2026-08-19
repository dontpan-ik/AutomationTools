class ApexCompliance {

    // Environment URLs

    public CT_QA_ENV = "https://qa-complianceportal.capstonelogistics.com/";
    public CT_RC_ENV = "https://rc-complianceportal.capstonelogistics.com/";
    public CT_DEV_ENV = "https://dev-complianceportal.capstonelogistics.com/";
    public CT_PP_ENV = "https://pp-complianceportal.capstonelogistics.com/";
    public CT_PROD = "https://complianceportal.capstonelogistics.com/";
    public CI_QA_ENV = "https://qa-complianceimaging.capstonelogistics.com/";
    public CI_RC_ENV = "https://rc-complianceimaging.capstonelogistics.com/";
    public CI_PROD = "https://complianceimaging.capstonelogistics.com/";

    // Login Page selectors and credentials
    public ct_login_button = "//app-layout/main/app-landing-page/div/div/div[2]/app-button/button";
    public ci_login_button = "//*[@id='root']/div[3]/button";
    public email_input = '//*[@id="signInName"]';
    public continue_button = '//*[@id="continue"]';
    public pass_input = '//*[@id="password"]';
    public login_submit = '//*[@id="next"]';

    public ct_partner_dropdown = "//app-layout/header/app-primary-toolbar/mat-toolbar/app-navigation-bar/nav/div[2]/app-partner-menu/button/span/app-icon/mat-icon";
    public ci_partner_table = "//*[@id='root']/div[1]/div[4]/div/div[4]/ul/li";
    public ci_partner_select_title = "//*[@id='root']/div[1]/div[4]/div/div[2]";
    public ci_site_table = "//*[@id='root']/div[1]/div[4]/div/div[5]/ul/li";
    public ci_site_select_title = "//*[@id='root']/div[1]/div[4]/div/div[1]";
    public ci_audit_not_started_title = "//*[@id='root']/div[1]/div[5]/div/div[1]";
    public ci_audit_not_started_option = "//*[@id='root']/div[1]/div[5]/div/div[4]/ul/li"

    public ci_free_form_po_button = "//*[@id='panel:r0:0']/div/button";
    public ci_free_form_po_title = "//body/div[2]/div[3]/h5";
    public ci_new_po_input = "//*[@id=':r1:']";
    public ci_vendor_search_dropdown = "//*[@id='vendors']";
    public ci_check_in_button = "//body/div[2]/div[3]/form/div/div[4]/div/input";
    public ci_check_out_button = "//body/div[2]/div[3]/form/div/div[5]/div/input";
    public ci_submit_new_po_button = "//body/div[2]/div[3]/form/button";

    public ci_select_new_po ="//*[@id='detail-header']/div[1]/div/label/span[1]/input";
    public ci_add_violation_button = "//*[@id='root']/div[1]/div[3]/div[3]/button[1]";
    public ci_violation_options = "//*[@id='root']/div[1]/div[3]/div[2]/div[3]/div[2]/ul/li[1]";
    public ci_dock_dropdown = "//*[@id='root']/div[1]/div[3]/div[2]/div[3]/div/div[1]/div/div/input";
    public ci_door_dropdown = "//*[@id='root']/div[1]/div[3]/div[2]/div[3]/div/div[2]/div/div/input";
    public ci_upload_photos_button = "//*[@id='root']/div[1]/div[3]/div[3]/button[4]";
    public ci_violation_description = "//*[@id='root']/div[1]/div[3]/div[2]/div[3]/div/div[3]/textarea";


}

export default ApexCompliance;