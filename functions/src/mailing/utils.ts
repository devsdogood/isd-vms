import {config} from "dotenv";
import {connect} from "node-mailjet";

const MESSAGE_FROM_EMAIL = "iowa-service-dogs-noreply@devsdogood.org";

export const sendMessage = async (
    to: string, subject: string, message: string, id?: string
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
          TextPart: message,
          CustomID: id,
        },
      ],
    });

    return true;
  } catch (e) {
    return false;
  }
};
