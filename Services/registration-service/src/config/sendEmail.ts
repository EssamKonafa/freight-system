const brevo = require('@getbrevo/brevo')

export const sendEmail = async ({htmlContent,receiverEmail,receiverName}:any) => {

    let apiInstance = new brevo.TransactionalEmailsApi();

    let apiKey = apiInstance.authentications['apiKey'];

    apiKey.apiKey = process.env.BREVO_API_KEY||"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";
    
    let sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.subject = 'Freight System';
    sendSmtpEmail.htmlContent = htmlContent;
    sendSmtpEmail.sender = { "name": "Freight System", "email": "essamazoz9@gmail.com" };
    sendSmtpEmail.to = [{ "email": receiverEmail, "name": receiverName }];
    sendSmtpEmail.replyTo = { "email": "shubham.upadhyay@sendinblue.com", "name": "Freight System Support" };
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = { "parameter": "My param value?????", "subject": "common subject?????" };
    try {
        await apiInstance.sendTransacEmail(sendSmtpEmail);
    } catch (error) {
        console.error('message:"error while sending email', error);
    };
};