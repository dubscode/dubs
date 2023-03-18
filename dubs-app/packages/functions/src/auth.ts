import * as aws from '@aws-sdk/client-ses';

import { AuthHandler, LinkAdapter, Session } from 'sst/node/auth';

import { Users as User } from '@dubs-app/core/types/sql.generated';
import { UserModel } from '@dubs-app/core/models/user';
import nodemailer from 'nodemailer';

declare module 'sst/node/auth' {
  export interface SessionTypes {
    user: User;
  }
}

type Attachment = {
  content: Buffer;
  filename: string;
};

type SendEmailParams = {
  subject: string;
  message: string;
  attachments?: Attachment[];
  sendTo: string;
};

const ses = new aws.SES({
  apiVersion: '2010-12-01',
  region: 'us-west-2',
});
const transporter = nodemailer.createTransport({
  SES: { ses, aws },
});

const sendEmailNotification = async ({
  subject,
  message,
  attachments,
  sendTo,
}: SendEmailParams) => {
  try {
    const params = {
      from: `Hello <hello@${process.env.MAIL_DOMAIN}>`,
      to: sendTo, // While in Sandbox mode, will need to whitelist recipients
      subject,
      html: message,
      attachments,
    };
    const sendResult = await transporter.sendMail(params);

    return sendResult;
  } catch (error) {
    console.log(`Error sendResult | ${subject}`, JSON.stringify(error));
    return error;
  }
};

// https://api.dev.wise.danwise.codes/auth/link/authorize?email=io.dwise@gmail.com

export const handler = AuthHandler({
  providers: {
    link: LinkAdapter({
      onError: async () => {
        return {
          statusCode: 500,
          body: 'Error',
        };
        /* ------------ To Implement ------------ */
        /* This function receives an error        */
        /* -------------------------------------- */
      },
      onLink: async (link, claims) => {
        const subject = 'Link to Login';

        const htmlMessage = `<h1>${subject}</h1><br><h3>This is an HTML email message also.</h3><p><a href=${link}>Click Link To Login</a></p>`;

        const email = claims.email as string;

        const sendResult = await sendEmailNotification({
          subject,
          message: htmlMessage,
          sendTo: email,
        });

        return {
          statusCode: 200,
          body: JSON.stringify({
            email,
            link,
            sendResult,
          }),
        };
        /* ------------ To Implement ------------ */
        /* This function receives a link that     */
        /* you can send over email or sms so      */
        /* that the user can login.               */
        /* -------------------------------------- */
      },
      onSuccess: async (claims) => {
        const email = claims.email as string;
        const { user, created } = await UserModel.findOrCreate({ email });

        const redirect = created
          ? `${process.env.REDIRECT_URL}/dashboard?new=true`
          : `${process.env.REDIRECT_URL}/dashboard`;

        return Session.cookie({
          redirect,
          type: 'user',
          properties: user as unknown as User,
        });
      },
    }),
  },
});
