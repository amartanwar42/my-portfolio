import type { NextApiRequest, NextApiResponse } from 'next';
const brevo = require('@getbrevo/brevo');
let apiInstance = new brevo.TransactionalEmailsApi();

let apiKey = apiInstance.authentications['apiKey'];
apiKey.apiKey = process.env.BREVO_API_KEY;

let sendSmtpEmail = new brevo.SendSmtpEmail();

sendSmtpEmail.subject = 'My Profile Visitor';
sendSmtpEmail.sender = {
	name: 'Amar',
	email: 'amartanwar42@gmail.com',
};
sendSmtpEmail.to = [{ email: 'amartanwar42@gmail.com', name: 'Amar' }];
sendSmtpEmail.replyTo = { email: 'amartanwar42@gmail.com', name: 'Amar' };
sendSmtpEmail.headers = { 'Some-Custom-Name': 'unique-id-1234' };

type Data = {
	message: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<Data>
) {
	if (req.method === 'POST') {
		const {
			name,
			email,
			message,
		}: { name: string; email: string; message: string } = req.body;
		const msg = `<!DOCTYPE html>
						<html>
						<head>
							<title>Contact Form Submission</title>
						</head>
						<body style="font-family: Arial, sans-serif; line-height: 1.6;">
							<p>
								<strong>Name:</strong> ${name}<br />
								<strong>Email:</strong> ${email}<br />
								<strong>Message:</strong> ${message}
							</p>
						</body>
						</html>`;
		sendSmtpEmail.htmlContent = `${msg}`;
		try {
			await apiInstance.sendTransacEmail(sendSmtpEmail);
			res.status(200).json({ message: 'Your message was sent successfully.' });
		} catch (err) {
			res
				.status(500)
				.json({ message: `There was an error sending your message. ${err}` });
		}
	}
}
