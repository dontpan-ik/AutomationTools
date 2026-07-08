class ApexTime{

    public time_app_QA = "https://qa-time.capstonelogistics.com/login";

    public email_input = "//app-root/app-login/div/div/div/div[2]/form/div[1]/input";
    public pass_input = "//app-root/app-login/div/div/div/div[2]/form/div[2]/input";
    public login_button = "//app-root/app-login/div/div/div/div[2]/form/button";
    public date_range_header = "//app-root/app-layout/app-linear-nav/nav/span";

    public site_dropdown = "//app-root/app-layout/app-simple-header/app-sub-depts-dropdown/app-header-dropdown/div/div";
    public site_search_input = "//app-root/app-layout/app-simple-header/app-sub-depts-dropdown/app-header-dropdown/div/ul/li[1]/input";
    public site_search_result = "//app-root/app-layout/app-simple-header/app-sub-depts-dropdown/app-header-dropdown/div/ul/li[2]";

    public timePunch_cancel_button ="//app-layout/section/app-punch-form/app-card/footer/button[1]";
    public add_timePunch_button = "//app-root/app-layout/section/app-table/app-card/header/button[1]";
    public add_timePunch_header = "//app-card/header/h1";
    public timePunch_error_message = "//small[contains(@class, 'form-error-message')]";
    public submit_timePunch_button = "//app-root/app-layout/section/app-punch-form/app-card/footer/button[2]";
    public associate_dropdown = "//app-root/app-layout/section/app-punch-form/app-card/form/fieldset/label[1]/select";
    public associate_dropdown_options = "//app-root/app-layout/section/app-punch-form/app-card/form/fieldset/label[1]/select/option";
    public workFunction_dropdown = "//app-root/app-layout/section/app-punch-form/app-card/form/fieldset/label[3]/select"; 
    public time_clock_options = "//app-root/app-layout/section/app-punch-form/app-card/form/fieldset/label[2]/select";
}

export default ApexTime;