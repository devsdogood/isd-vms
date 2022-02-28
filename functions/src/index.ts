import * as functions from "firebase-functions";
import {getUserData} from "./users/utils";
import {getEventData} from "./events/utils";
import {sendMessage} from "./mailing/utils";

// send email when user registers for an event
export const registration = functions.firestore
    .document("eventSignups/{docId}")
    .onCreate(async (snapshot, context) => {
      const data = snapshot.data();
      const userData = await getUserData(data.volunteer);
      const eventData = await getEventData(data.event);

      const messageSent = await sendMessage(
          userData.email,
          "You're Registered!",
          `You've registered for ${eventData.title} event.`
      );

      if (!messageSent) {
        functions.logger.error(`Failed to send email to ${userData.email}`);
      }
    });
