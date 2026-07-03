class ApexCompliance {

    // Environment URLs

    public QA_ENV = "https://qa-complianceportal.capstonelogistics.com/";
    public RC_ENV = "https://rc-complianceportal.capstonelogistics.com/";
    public DEV_ENV = "https://dev-complianceportal.capstonelogistics.com/";
    public PP_ENV = "https://pp-complianceportal.capstonelogistics.com/";
    public PROD = "https://complianceportal.capstonelogistics.com/";
    public CI_QA_ENV = "https://qa-complianceimaging.capstonelogistics.com/";
    public CI_RC_ENV = "https://rc-complianceimaging.capstonelogistics.com/";
    public CI_PROD = "https://complianceimaging.capstonelogistics.com/";

    // Login Page selectors and credentials
    public global_admin_email = "";
    public global_admin_pass = "";
    public prod_sample_email = "";
    public prod_sample_pass = "";
    public login_button = "//app-layout/main/app-landing-page/div/div/div[2]/app-button/button";
    public email_input = '//*[@id="signInName"]';
    public continue_button= '//*[@id="continue"]';
    public pass_input = '//*[@id="password"]';
    public login_submit = '//*[@id="next"]';

    public partner_dropdown = "//app-layout/header/app-primary-toolbar/mat-toolbar/app-navigation-bar/nav/div[2]/app-partner-menu/button/span/app-icon/mat-icon";


}

export default ApexCompliance;