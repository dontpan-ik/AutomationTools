import { Page } from "@playwright/test";

class FacebookLocators{

    // FB CREDENTIALS
    public fb_email = "";
    public fb_pass = "";
    
    // PAGES URL
    public page_test = "https://www.facebook.com/HeyJalisc0/photos";

    // LOCATORS
    public login_email_input = '//*[@id="login_popup_cta_form"]/div/div/div/div[3]/div/div/label/div/input';
    public login_pass_input = '//*[@id="login_popup_cta_form"]/div/div/div/div[4]/div/div/label/div/input';
    public login_confirm_button = '//*[@id="login_popup_cta_form"]/div/div/div/div[5]/div';
    public next_img = '//div/div[3]/div/div/div[1]/div[1]/div/div[1]/div/div[1]/div/div[1]/div[3]/div/div/div';
    public current_img = '//div/div[1]/div/div[3]/div/div/div[1]/div[1]/div/div[1]/div/div[1]/div/div[2]/div/div/div/img';
    // GETTING IMAGE DATE
    public current_img_date= '//*[@id="mount_0_0_+Y"]/div/div[1]/div/div[5]/div/div/div[3]/div[2]/div/div[3]/div[2]/div/div/div[1]/div[2]/div[1]/div[1]/div[2]/div/div[2]';

    public img_display = "//div[@class ='x6s0dn4 x1ey2m1c x78zum5 xtijo5x x1o0tod x1qughib x10l6tqk x13vifvy']";

    constructor(private page: Page) {}

    // Actions
    async login(email: string, password: string) {
        await this.page.locator(this.login_email_input).fill(email);
        await this.page.locator(this.login_pass_input).fill(password);
        await this.page.locator(this.login_confirm_button).click();
    }

    async selectNextImage() {
        await this.page.locator(this.next_img).click();
    }
}

export default FacebookLocators;