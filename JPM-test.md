# JPMC-PDP Documentation from https://developer.payments.jpmorgan.com

# Testing

The test environment generates results based on the transaction request and card details.

## Before you begin

To conduct a test transaction, you need your test credentials from onboarding.

## US and Canada

### Card test data

Use the following test card data in a request to receive a pre-determined outcome. This helps you to integrate with the API more efficiently and plan for `SUCCESS` and `ERROR` scenarios.

 
**Card test numbers — US and Canada**

| Card brand | Test card number(s) | Notes | 
| --- | --- | --- | 
| ACCEL PINless debit | 4935 5500 0000 0006 |  | 
| American Express | 3711 4437 1144 376 3411 3411 3411 347 |  | 
| ChaseNet | 4559 9611 1111 1118 4559 9633 3333 3330 |  | 
| Diners Club | 3643 8936 4389 36 |  | 
| Discover | 6011 0160 1101 6011 6559 9065 5990 6557 |  | 
| International Maestro | 6706 9811 1111 1113 6706 9870 0000 0002 |  | 
| Japan Credit Bureau | 3566 0035 6600 3566 3528 0000 0000 0007 |  | 
| Mastercard | 2221 0000 0000 0009 5112 3451 1234 5114 5555 5555 5555 5565 | Use 5555 5555 5555 5565 only for partial authorizations: - amounts greater than $70 return a PARTIAL_APPROVAL response - amounts $70 or less return an APPROVED response | 
| Mastercard restricted debit (for Canada) | 5510 2900 0000 0009 |  | 
| Maestro PINless debit | 5204 7400 0000 0087 |  | 
| NYCE PINless debit | 4430 7100 0000 0006 |  | 
| Pulse PINless debit | 5342 3400 0000 0006 |  | 
| STAR PINless debit | 5322 3400 0000 0000 |  | 
| UnionPay | 6221 2611 1111 3245 |  | 
| Visa | 4112 3441 1234 4113 4110 1441 1014 4115 4470 0513 0000 0000 003 4444 4444 4444 4455 4444 4411 1111 1110 (use for account verification negative test) | Use 4444 4444 4444 4455 only for partial authorizations - amounts greater than $70 return a PARTIAL_APPROVAL response - amounts $70 or less return an APPROVED response | 
| Visa restricted debit (for Canada) | 4506 4411 1111 1115 |  | 

### Card verification

To generate a specific card verification response code, refer to the following table.

Send card verification request data in the paymentMethodType.card.`cvv` field. Check the card verification result in the paymentMethodType.card.networkResponse.`cardVerificationResult` field.

> The 4-digit values only apply to American Express.
> 

 
**Card verification response codes — US and Canada**

| Card brand | Request | Response | 
| --- | --- | --- | 
| All | 111 | MATCH | 
| American Express | 1111 | MATCH | 
| American Express | 3111 | NO_MATCH | 
| American Express | 3112 | NOT_PROCESSED | 
| Discover, Diners, Japan Credit Bureau | 611 | NO_MATCH | 
| Discover, Diners, Japan Credit Bureau | 612 | NOT_PROCESSED |  | 
| Discover, Diners, Japan Credit Bureau | 613 | NOT_SUPPORTED | 
| Mastercard | 512 | NOT_PROCESSED | 
| Mastercard, International Maestro | 511 | NO_MATCH | 
| Mastercard, International Maestro | 513 | NOT_SUPPORTED | 
| Visa | 411 | NO_MATCH | 
| Visa | 412 | NOT_PROCESSED | 

### Address Verification Service (AVS)

To generate a specific address verification response code, refer to the following table. The issuer determines the authorization response independent of the address verification result code. The issuer approves or declines the authorization request based on the AVS outcome.

Send request address data in the accountHolder.`billingAddress` object. Check the AVS result in the paymentMethodType.card.networkResponse.`addressVerificationResult` field.

 
**Address verification response codes — US addresses**

| Card brand | Request | Response | 
| --- | --- | --- | 
| Mastercard, Visa, Discover, American Express | 03105 | ADDRESS_MATCH (I5, I7) | 
| Mastercard, Visa, Discover, American Express | 03102 | POSTALCODE_MATCH | 
| Mastercard, Visa, Discover, American Express | 03101 | ADDRESS_POSTALCODE_MATCH | 
| Discover, American Express | 10451/5 Main Street/Tracy Chase | NAME_MATCH | 
| Discover, American Express | 10457/7 Broadway Avenue/Bob Chase | NAME_ADDRESS_MATCH | 
| Discover, American Express | 10454/8 Main Street/Larry Chase | NAME_POSTALCODE_MATCH | 
| Mastercard, Visa, Discover, American Express | 03106 | NO_MATCH | 
| Mastercard, Visa, Discover, American Express | 03062 | SERVICE_NOT_AVAILABLE_RETRY | 
| Mastercard, Visa, Discover, American Express | 03111 | SERVICE_NOT_SUPPORTED | 

 
**Address verification response codes — Canadian addresses**

| Card brand | Request | Response | 
| --- | --- | --- | 
| Mastercard, Visa, Discover, American Express | Full address data | ADDRESS_POSTALCODE_MATCH | 
| Mastercard, Visa, Discover, American Express | postalCode only | POSTALCODE_MATCH | 
| Mastercard, Visa | postalCode only and postalCode = J0P1J0 (no spaces) | NO_MATCH | 
| Mastercard, Visa | postalCode only and postalCode = J0P 1J0 | ADDRESS_MATCH | 

### Payment response

Set the amount of the request to control the payment approval response. Each specific amount generates the following common approval or decline result. An approval is the default response for amounts not listed. Test payment responses in a `POST` to `/payments` and `/refunds`.

 
**Approved/declined response codes — US and Canada**

| Amount | Card number(s) | responseStatus | responseCode | responseMessage | Additional information | 
| --- | --- | --- | --- | --- | --- | 
| 10000 | Any of the previously listed cards. | SUCCESS | APPROVED | Transaction approved by Issuer | The transaction was approved by the issuer. | 
| 53000 | 3711 4437 1144 376 4112 3441 1234 4113 | DENIED | DO_NOT_HONOR | Do not honor | The transaction was declined by the issuer. No other information has been provided. | 
| 30330 | 4559 9611 1111 1118 6706 9870 0000 0002 | DENIED | DECLINED | Transaction declined | The transaction was declined by the issuer. No other information has been provided. | 
| 83300 | 5112 3451 1234 5114 4559 9611 1111 1118 3566 0035 6600 3566 | DENIED | DECLINED_NOT_SUPPORTED | Transaction declined by Issuer | The transaction was declined from an invalid merchant. | 
| 52100 | 6221 2611 1111 3245 5112 3451 1234 5114 4559 9611 1111 1118 6706 9870 0000 0002 | DENIED | INSUFFICIENT_FUNDS | Transaction declined due to insufficient funds | The transaction was declined by the issuer due to insufficient funds. | 
| 52200 | 5112 3451 1234 5114 4559 9611 1111 1118 6706 9870 0000 0002 | DENIED | CARD_EXPIRED | Transaction declined due to expired card | The transaction was declined due to an expired card. | 
| 40100 | 3711 4437 1144 376 4112 3441 1234 4113 | DENIED | DECLINED_REFER_TO_ISSUER | Transaction declined - refer to Issuer | The transaction was declined. Contact the issuer. | 
| 50100 | 5112 3451 1234 5114 4559 9611 1111 1118 3566 0035 6600 3566 3711 4437 1144 376 6706 9870 0000 0002 | DENIED | PICK_UP_CARD | Transaction declined - Pick up card | The transaction was declined by the issuer. | 
| 50200 | 5112 3451 1234 5114 4559 9611 1111 1118 3566 0035 6600 3566 3643 8936 4389 36 6011 0160 1101 6011 | DENIED | LOST_STOLEN_CARD | Transaction declined - lost or stolen card | The transaction was declined by the issuer due to a reported lost or stolen card. | 
| 75400 | 5112 3451 1234 5114 4559 9611 1111 1118 | DENIED | ACCOUNT_CLOSED | Account Closed | The transaction was declined by the issuer, as the associated account is closed. | 
| 30100 | 5112 3451 1234 5114 4559 9611 1111 1118 3566 0035 6600 3566 3643 8936 4389 36 6011 0160 1101 6011 | ERROR | SERVER_ERROR | Server error, please retry | The server encountered an unexpected issue and did not process your request. | 
| 59500 | 5112 3451 1234 5114 4559 9611 1111 1118 3643 8936 4389 36 6011 0160 1101 6011 | DENIED | NEW_CARD_ISSUED | Transaction declined - New Card Issued | The transaction was declined by the issuer due to the issuance of a new or replacement card. | 
| 30400 | 5112 3451 1234 5114 4559 9611 1111 1118 3566 0035 6600 3566 3643 8936 4389 36 6011 0160 1101 6011 | DENIED | INVALID_ACCOUNT | Transaction declined - Invalid Account | The transaction was declined by the issuer due to an invalid account. | 

## Australia

### Card test data

Use the following test card data in a request to receive a pre-determined outcome. This helps you to integrate with the API more efficiently and plan for `SUCCESS` and `ERROR` scenarios.

 
**Test card numbers — Australia**

| Card brand | Test card number | 
| --- | --- | 
| American Express | 3739 5319 2351 004 3411 1159 9241 000 | 
| eftpos Australia | 4687 3801 0001 0006 | 
| Mastercard | 2221 0000 0000 0009 2223 0008 9000 0000 5204 7400 0000 1002 | 
| Visa | 4761 2200 0000 0237 4012 0010 3714 1112 4444 4411 1111 1110 (use for account verification negative test) | 

### Card verification

To generate a specific card verification response code, refer to the following table.

Send card verification request data in the paymentMethodType.card.`cvv` field. Check the card verification result in the paymentMethodType.card.networkResponse.`cardVerificationResult` field.

> The 4-digit values only apply to American Express.
> 

 
**Card verification response codes — Australia**

| Request | Response | 
| --- | --- | 
| 111 | MATCH | 
| 112 | NOT_PRESENT | 
| 113 | NOT_PROCESSED | 
| 114 | NO_MATCH | 
| 115 | NOT_SUPPORTED | 
| 1111 | MATCH | 
| 1112 | NOT_PRESENT | 
| 1113 | NOT_PROCESSED | 
| 1114 | NO_MATCH | 
| 1115 | NOT_SUPPORTED | 

The following card verification values apply to declined payments.

 
**Card verification response codes in declined payments — Australia**

| Request | responseStatus | responseCode | responseMessage | Additional information | 
| --- | --- | --- | --- | --- | 
| 116 | DENIED | DECLINED | Transaction declined by issuer | The transaction was declined by the issuer. | 
| 1116 | DENIED | DECLINED | Transaction declined by issuer | The transaction was declined by the issuer. | 
| 117 | DENIED | DECLINED_CVV | Transaction declined due to CVV | The transaction was declined by the issuer due to an invalid verification value. | 
| 1117 | DENIED | DECLINED_CVV | Transaction declined due to CVV | The transaction was declined by the issuer due to an invalid verification value. | 

### Address Verification Service (AVS)

To generate a specific address verification response code, refer to the following table. The issuer determines the authorization response independent of the address verification response code. The issuer may approve or decline the authorization request based on the AVS outcome.

Send request address data in the accountHolder.`billingAddress` object. Check the AVS result in the paymentMethodType.card.networkResponse.`addressVerificationResult` field.

 
**Address verification response codes — Australia**

| Request postalCode | Response | 
| --- | --- | 
| 10011 | ADDRESS_MATCH | 
| 10012 | POSTALCODE_MATCH | 
| 10013 | ADDRESS_POSTALCODE_MATCH | 
| 10014 | NAME_MATCH | 
| 10015 | NAME_ADDRESS_MATCH | 
| 10016 | NAME_POSTALCODE_MATCH | 
| 10017 | NO_MATCH | 
| 10018 | SERVICE_NOT_AVAILABLE_RETRY | 
| 10019 | SERVICE_NOT_SUPPORTED | 
| 10020 | NOT_AVAILABLE | 
| 10021 | NOT_VERIFIED | 
| 10022 | NOT_PROCESSED | 

The following AVS values apply to declined payments.

 
**Address verification response codes in declined payments — Australia**

| Request postalCode | responseStatus | responseCode | responseMessage | Additional information | 
| --- | --- | --- | --- | --- | 
| 10023 | DENIED | DECLINED | Transaction declined by issuer | The transaction was declined by the issuer. | 
| 10024 | DENIED | DECLINED | Transaction declined by issuer | The transaction was declined by the issuer. | 

### Payment response

Control the test response by changing the amount in the request. Each specific amount generates the following common approval or decline result. An approval is the default response for amounts not listed. Test payment responses in a `POST` to `/payments` and `/refunds`.

 
**Payments and refunds response codes — Australia**

| Amount | Resource | responseStatus | responseCode | responseMessage | Additional information | 
| --- | --- | --- | --- | --- | --- | 
|  | /payments /refunds | SUCCESS | APPROVED | Transaction approved | The transaction was approved by the issuer. | 
| 2002 | /payments | SUCCESS | APPROVED | Transaction Approved Honor with ID | The transaction was approved by the issuer. | 
| 2003 | /payments /refunds | DENIED | DECLINED | Transaction declined by issuer | The transaction was declined by the issuer, no other information has been provided. | 
| 2004 | /payments /refunds | DENIED | DECLINED | Transaction declined - Invalid merchant | The transaction was declined from an invalid merchant. | 
| 2005 | /payments | DENIED | DECLINED | Transaction declined - Invalid Transaction | The transaction was declined, as the transaction is not valid. | 
| 2006 | /payments /refunds | DENIED | DECLINED | Transaction declined - Invalid amount | The transaction was declined for an invalid amount. | 
| 2007 | /payments | DENIED | DECLINED | Transaction declined - Invalid Issuer | The transaction was declined because the card is not valid for the issuer. | 
| 2008 | /payments | DENIED | DECLINED | Transaction declined - Retry | The transaction was declined, and the issuer recommends retrying the request. | 
| 2009 | /payments | DENIED | DECLINED | ransaction declined - duplicate transmission detected | The transaction was declined by the issuer, as it was identified as a duplicate. | 
| 2010 | /payments | DENIED | DECLINED | Transaction declined - Stop payment order | The transaction was declined by the issuer, and any subsequent payments should be stopped. | 
| 2011 | /payments | DENIED | DECLINED | Transaction declined - Revocation of authorization order | The transaction was declined by the issuer, and the authorization for subsequent payments was revoked. | 
| 2012 | /payments | DENIED | DECLINED | Transaction declined - Revocation of all authorizations order | The transaction was declined by the issuer, and authorization for all subsequent payments was revoked. | 
| 2013 | /payments | DENIED | DECLINED | Surcharge amount not permitted on Visa cards (U.S. acquirers only) | The transaction was declined by the issuer, as surcharging is not permitted. | 
| 2014 | /payments | DENIED | DECLINED | Cryptographic failure | A cryptographic failure was detected while processing the request. | 
| 2015 | /payments | DENIED | DECLINED | Unable to route transaction | The transaction was declined due to a routing issue. | 
| 2016 | /payments | DENIED | DECLINED | Transaction cannot be completed; violation of law | The transaction was declined by the issuer and is not permitted. | 
| 2017 | /payments | DENIED | DECLINED | System error | The transaction was declined by the issuer due to a system issue. | 
| 2018 | /payments | DENIED | DECLINED | Invalid Authorization Life | The transaction was declined by the issuer. | 
| 2019 | /payments | DENIED | DECLINED | Transaction not permitted to acquirer/terminal | The transaction was declined, as the transaction is not permitted. | 
| 2020 | /payments | DENIED | DECLINED | Security violation | The transaction was declined due to a security violation. | 
| 2021 | /payments | DENIED | DECLINED | Transaction does not fulfill AML requirement | The transaction was declined, as anti-money laundering (AML) requirements were not met. | 
| 2022 | /payments | DENIED | DECLINED | Visa transactions: credit issuer unavailable Private label: invalid date | The transaction was declined because the issuer was unavailable, or due to an invalid date. | 
| 2023 | /payments /refunds | DENIED | DECLINED | Format Error | The transaction was not approved due to a message formatting error. | 
| 2024 | /payments | DENIED | DECLINED | Exceeds withdrawal amount limit | The requested amount exceeds the withdrawal limit. | 
| 2025 | /payments /refunds | DENIED | INSUFFICIENT_FUNDS | Transaction decined due to insufficient funds | The transaction was declined by the issuer due to insufficient funds. | 
| 2026 | /payments | DENIED | CARD_EXPIRED | Transaction declined due to expired card | The transaction was declined due to an expired card. | 
| 2027 | /payments | DENIED | DECLINED_DO_NOT_CONTACT_ISSUER | Transaction declined – do not contact issuer | The transaction was declined by the issuer. | 
| 2028 | /payments | DENIED | DECLINED_REFER_TO_ISSUER | Transaction declined - refer to Issuer | The transaction was declined. Contact the issuer. | 
| 2029 | /payments | DENIED | DECLINED_INVALID_CVV | Transaction declined by the issuer due to invalid card verification value | The transaction was declined by the issuer due to an invalid or incorrect CVV. | 
| 2030 | /payments | DENIED | DECLINED_CVV | Transaction declined due to card verification value | The transaction was declined by the issuer due to an invalid or incorrect CVV. | 
| 2031 | /payments | DENIED | DECLINED_AVS | Transaction declined due to card AVS result | The transaction was declined by the issuer due to incorrect billing address information. | 
| 2032 | /payments | DENIED | DECLINED_AVS_CVV | Transaction declined due to AVS result and card verification value | The transaction was declined by the issuer due to an invalid/incorrect CVV and incorrect billing address information. | 
| 2033 | /payments | DENIED | CALL_ISSUER_ID_REQUIRED | Transaction declined — call issuer, positive ID required | The transaction was declined. Contact the issuer. | 
| 2034 | /payments | DENIED | DECLINED_NOT_SUPPORTED | Transaction declined by Issuer | The transaction was declined by the issuer, as the transaction is not supported. | 
| 2035 | /payments | DENIED | LOST_STOLEN_CARD | Transaction declined — lost or stolen card | The transaction was declined by the issuer due to a reported lost or stolen card. | 
| 2036 | /payments | DENIED | PICK_UP_CARD | Transaction declined — pick up card | The transaction was declined by the issuer. | 
| 2037 | /payments /refunds | DENIED | DO_NOT_HONOR | Transaction declined — do not honor | The transaction was declined by the issuer. | 
| 2038 | /payments | DENIED | CARD_NOT_ACTIVE | Transaction declined — card not active | The transaction was declined by the issuer, as the card has not been activated. | 
| 2039 | /payments | DENIED | ACCOUNT_CLOSED | Transaction declined — account is closed | The transaction was declined by the issuer, as the associated account is closed. | 
| 2040 | /payments | DENIED | NEW_CARD_ISSUED | Transaction declined — new card issued | The transaction was declined by the issuer due to issuance of a new or replacement card. | 
| 2041 | /payments /refunds | DENIED | INVALID_ACCOUNT | Transaction declined — invalid account | The transaction was declined by the issuer due to an invalid account. | 
| 2042 | /payments | DENIED | USE_IS_RESTRICTED | Transaction declined — use is restricted | The transaction was declined by the issuer due to a restricted transaction. | 
| 2043 | /payments | DENIED | USE_IS_RESTRICTED | Domestic Debit Transaction Not Allowed (Regional use only) | The transaction was declined by the issuer, as it is only permitted for domestic or regional use. | 

The following amounts generate error messages:

 
**Error response codes — Australia**

| Amount | Resource | responseStatus | responseCode | responseMessage | Additional information | 
| --- | --- | --- | --- | --- | --- | 
| 9001 | /payments /refunds | ERROR | UNSUPPORTED_CURRENCY | Merchant not configured to support provided currency | The currency in the request does not match the allowed currencies for the merchant ID. | 
| 9002 | /payments /refunds | ERROR | UNSUPPORTED_CARD_TYPE | Merchant not configured to accept provided card type | The card or account number in the request is not configured for the merchant ID. | 
| 9003 | /payments /refunds | ERROR | SERVER_ERROR | Server error, please retry | The server encountered an unexpected issue and did not process your request. | 
| 9004 | /payments /refunds | ERROR | PAYMENT_TYPE_NOT_SUPPORTED | Card BIN range not supported by card brand | The card or account number in the request is not supported or is invalid. | 
| 9005 | /payments /refunds | ERROR | UNAUTHORIZED | Incorrect combination of Application ID and Merchant ID in the header | The request contains an invalid combination of authorization credentials. The application ID and/or merchant ID is incorrect. | 
| 9006 | /payments /refunds | ERROR | FORBIDDEN | Merchant not authorized to access the resource | The requested service is not entitled for the merchant ID. | 
| 9007 | /payments /refunds | ERROR | TIMEOUT | Request timeout | The request timed out in the processing flow. The recommendation is to retry the same request. | 

## Europe

### Card test data

Use the following test card data in a request to receive a pre-determined outcome. This helps you to integrate with the API more efficiently and plan for `SUCCESS` and `ERROR` scenarios.

 
**Test card numbers - Europe**

| Card brand (co-branded) | Test card number | 
| --- | --- | 
| Cartes Bancaires / Mastercard | 5341 0279 0000 0001 | 
| Cartes Bancaires / Mastercard | 5498 5800 0000 0009 | 
| Cartes Bancaires / Visa | 4561 9532 0000 0001 | 
| Cartes Bancaires / Visa | 4978 7438 0000 0007 | 
| Visa | 4444 4411 1111 1110 (use for account verification negative test) | 

## 3-D Secure

Use test cards with any address, card verification code (CVC), and any future expiration date to test authentication and authorization requests in the test environment.

Use the cards below to test frictionless and challenge flows, as well as `SUCCESS` and `DENIED` authorization post back responses. 

> 
> - For challenge flows, multiple one-time passcodes (OTP) can be used to generate various 3DS electronic commerce indicator (ECI) and transStatus results to provide for a wide range of test scenarios.
> 
> - For additional information regarding the regions in which [3-D Secure](/docs/commerce/online-payments/capabilities/online-payments/payment-enhancements/3d-secure) is supported, refer to the [Payment Enhancements Overview](/docs/commerce/online-payments/capabilities/online-payments/payment-enhancements/index) page.
> 

 
**Card test numbers — 3-D Secure**

| Card brand | Test card number | Authorization flow | transStatus | responseStatus | 
| --- | --- | --- | --- | --- | 
| American Express | 3478 9912 9656 655 | FRICTIONLESS |  | SUCCESS | 
| American Express | 3486 3826 7931 507 | CHALLENGE | 7777-y-5 8888-a-5 | SUCCESS | 
| Mastercard | 5424 1840 4982 1670 | CHALLENGE | 2112-Y-02 4444-A-01 | SUCCESS | 
| Visa | 4112 3441 1234 4113 | CHALLENGE | 7777-y-5 8888-a-5 | SUCCESS | 
| Visa | 4110 1441 1014 4115 | FRICTIONLESS |  | SUCCESS | 
| Mastercard | 5112 3451 1234 5114 | FRICTIONLESS |  |  | 
| Discover | 6559 9065 5990 6557 | CHALLENGE | 7777-y-5 8888-a-5 | SUCCESS | 
| Cartes Bancaires | 5498 5800 0000 0009 | CHALLENGE | 7777-y-5 8888-a-5 | SUCCESS | 
| Cartes Bancaires | 5341 0279 0000 0001 | FRICTIONLESS |  | SUCCESS | 
| Cartes Bancaires | 4978 7438 0000 0007 | CHALLENGE | 7777-y-5 8888-a-5 | SUCCESS | 
| Cartes Bancaires | 4561 9532 0000 0001 | FRICTIONLESS |  | SUCCESS | 

> For Cartes Bancaires, to simulate receiving an exemption in the response send a transaction under 10 EUR to return **low value payment** or over 400 EUR to return **transaction risk analysis**.
> 

## Network tokens

To test [network tokens](/docs/commerce/optimization-protection/capabilities/tokenization/network-tokenization), use any of the following test card numbers:

 
**Test card numbers for testing network tokens**

| Card brand | Region(s) supported | Test card number | 
| --- | --- | --- | 
| ChaseNet | Australia, Canada, US | 4555 5511 1111 1111 | 
| Mastercard | Australia, Canada, US | 5499 9966 6666 6660 | 
| Visa | Australia, Canada, US | 4777 7799 9999 9990 | 

 
**Direct debits**

| Payment method | Endpoint | Routing number | Account number | responseMessage | 
| --- | --- | --- | --- | --- | 
| US ACH | /verifications | 051001413 | 12587458963 | Invalid transit routing number | 
| US ACH | /verifications | 122000247 | 0888271156 | Transaction accepted | 

## Real-Time Account Updater

To test Real-Time Account Updater (RTAU), use any of the following test card numbers:

 
**RTAU table**

| Test card number(s) | accountUpdaterResponse | 
| --- | --- | 
| 4112344112344113 | NEW_ACCOUNT | 
| 4114360123456785 | NEW_ACCOUNT_AND_EXPIRY | 
| 4110144110144115 | NEW_EXPIRY | 
| 4061724061724061 | CONTACT_CARDHOLDER | 
| 4112341111111113 | CLOSED_ACCOUNT | 
| 4112344203111397 | MATCH_NO_UPDATE | 

## US healthcare cards

To test healthcare cards, use any of the following test card numbers:

 
**Test card numbers for healthcare cards**

| Card brand | Test card number(s) | 
| --- | --- | 
| Mastercard | 5199 9999 9999 9991 5299 9999 9999 9990 | 
| Visa | 4999 9911 1111 1113 4999 9922 2222 2229 | 

## Alternative payment methods

### Apple Pay

For a full listing of test cards, as well as instructions for adding cards to your test device, refer to [Apple Pay](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/applepay)’s [developer sandbox testing](https://developer.apple.com/apple-pay/sandbox-testing) website.

### Google Pay

In order to test mock payment cards for [Google Pay](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/googlepay), merchants must first create and/or login to a valid Google account. Once complete, refer to Google's [test card suite](https://developers.google.com/pay/api/android/guides/resources/test-card-suite) website for additional information.

### Klarna

For a full listing of test cards, as well as instructions for adding cards, refer to Klarna's [sample payment data](https://docs.klarna.com/acquirer/jpm/resources/developer-tools/sample-data/sample-payment-data/) page.

### PayPal

Prior to testing [PayPal](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/paypal) transactions, you must create a Paypal sandbox account. To do so, perform the following steps:

1. Navigate to [https://developer.paypal.com](https://developer.paypal.com).

2. If not already done, create an account.

3. From the left-side navigation panel, under the Sandbox section, select Accounts.

4. Select your personal account to view your sandbox account details and mock transaction credentials.

For a full list of test cards, refer to PayPal's [card testing](https://developer.paypal.com/home) information.

### Paze

Prior to testing [Paze](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/paze) transactions, ensure that you have onboarded with J.P. Morgan. If you are a new client, [contact us](https://developer.payments.jpmorgan.com/contact) so our team can help you determine the best products and services to meet your needs. If you are an existing client, contact your relationship manager to ensure that you have been enrolled with Paze. 

### Alipay, iDEAL, Paypal, Trustly, and WeChat Pay

1. Follow these steps to test [Alipay](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/alipay), [iDEAL](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/ideal), [Paypal](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/paypal), [Trustly](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/trustly), and [WeChat Pay](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/wechat):
  1. WeChat Pay, Alipay
  1. Select "Proceed with WeChat Pay” or “Proceed with Alipay" in checkout page.
  2. In subsequent popup, enter anything into the username and password fields and hit "Login".
  3. Select "Make Payment".
  4. Select "Back to where you came from".
  2. PayPal
  1. Configure a Sandbox account by following [this page](https://developerhub.ppro.com/simple-api/docs/paypal#configuring-a-paypal-sandbox-account).
  2. Click PayPal button.
  3. In popup, enter SANDBOX email and password (not your personal information).
  4. Click Login.
  5. Select desired payment method.
  6. Hit "Complete Purchase".
  3. iDEAL
  1. Proceed with iDEAL.
  2. Select "TESTNL2A" as the bank.
  3. Hit Success or Failure flow.
  4. Trustly
  1. Proceed with Trustly.
  2. On the bottom left you can change the language to English.
  3. Select the checkbox and then Continue button.
  4. Select Commerzbank.
  5. Select the checkbox and then Continue button again.
  6. Select test case or just pick the default selected ("no test").
  7. Click Continue.
  8. Login Id: "foobar123" and click Continue.
  9. Enter the code on screen and click Continue.
  10. Pick either checking or savings account and Continue.
  11. Continue.
  12. Enter new code and hit Confirm Payment.

2. In a successful request, J.P. Morgan returns the following:
  1. responseCode as CONSUMER_PENDING.
  2. transactionState as PENDING.
  3. A redirect URL in the redirectedPayment redirectUrl field.

3. Use the redirectURL to redirect the simulated user to the host page of the selected alternative payment method, wallet, or gateway, depending on the payment method type.

4. Your simulated user follows the payment steps and completes the transaction.

5. You receive the payment result in the transactionState of the webhook notification service.

Payment results are as follows:

 
**Payment result**

| transactionState value | Payment result | Funds status | 
| --- | --- | --- | 
| AUTHORIZED | Successful | Not received | 
| CLOSED | Successful | Received | 
| DECLINED | Declined | Not applicable | 
| ERROR | Error | Not applicable | 

> If the `transactionState`** **is `AUTHORIZED`, we send an additional notification when funds are received and the `transactionState` is `CLOSED`. For guaranteed bank redirects, the `transactionsState`** **returns `CLOSED` (without a preceding `AUTHORIZED`) as a successful payment result.
> 

## Related

[3-D Secure](/docs/commerce/online-payments/capabilities/online-payments/payment-enhancements/3d-secure)
 [Alipay](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/alipay)
 [Apple Pay](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/applepay)
 [Card payments](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/cards/index)
 [ACH](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/ach)
 [Google Pay](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/googlepay)
 [iDEAL](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/ideal)
 [Payment enhancements](/docs/commerce/online-payments/capabilities/online-payments/payment-enhancements/index)
 [Payment methods](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/index)
 [PayPal](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/paypal)
 [PayPal Sandbox Account](https://developerhub.ppro.com/simple-api/docs/paypal#configuring-a-paypal-sandbox-account)
 [Paze](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/paze)
 [SEPA](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/sepa)
 [Tokenization](/docs/commerce/optimization-protection/capabilities/tokenization/index)
 [Trustly](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/trustly)
 [WeChat Pay](/docs/commerce/online-payments/capabilities/online-payments/payment-methods/wechat)
