import {config} from "dotenv";
import {connect} from "node-mailjet";

const MESSAGE_FROM_EMAIL = "noreply@devsdogood.org";

export const templates = {
  registration: 3690272,
  notification: 3690635,
};

export const timeDisplayFormat = "h:mm:ss a";

export const eventDataProps = [
  "title",
  "locationAddress",
  "locationName",
  "contact",
  "description",
];

export const sendMessage = async (
    to: string, subject: string, template: number, variables: any, id?: string
): Promise<boolean> => {
  // load Mailjet keys from .env
  config();

  const mailjet = connect(
    process.env.MAILJET_API_KEY!,
    process.env.MAILJET_API_SECRET!,
  );

  try {
    await mailjet.post("send", {version: "v3.1"}).request({
      Messages: [
        {
          From: {
            Email: MESSAGE_FROM_EMAIL,
          },
          To: [
            {
              Email: to,
            },
          ],
          Subject: subject,
          TemplateID: template,
          Variables: variables,
          TemplateLanguage: true,
          CustomID: id,
        },
      ],
    });

    return true;
  } catch (e) {
    return false;
  }
};
