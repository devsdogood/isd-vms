import * as functions from "firebase-functions";
import {getUserData} from "./users/utils";
import {getEventData} from "./events/utils";
import {sendMessage} from "./mailing/utils";
import {admin} from "./utils";
import moment from "moment";

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

// notify users at 5pm if they have an event the following day
export const notification = functions.pubsub
    .schedule("0 17 * * *")
    .timeZone("America/Chicago")
    .onRun(async () => {
      // get start of tomorrow and the next day
      const tomorrow = moment()
          .utcOffset("-06:00")
          .add(1, "day")
          .startOf("day");
      const next = tomorrow.clone().add(1, "day");

      // get all events starting sometime tomorrow
      const events = await admin
          .firestore()
          .collection("events")
          .where("start", ">=", tomorrow.toDate())
          .where("start", "<", next.toDate())
          .get();
      const ids = events.docs.map((doc) => doc.id);

      if (!ids.length) {
        return;
      }

      // get all verified registrations for events during the time interval
      const signups = await admin
          .firestore()
          .collection("eventSignups")
          .where("event", "in", ids)
          .where("status", "==", 1)
          .where("deleted", "==", false)
          .get();

      // send a reminder email to each user about their registration
      const messages = signups.docs.map(async (doc) => {
        const signup = doc.data();
        const user = await getUserData(signup.volunteer);
        const event = await getEventData(signup.event);

        const messageSent = await sendMessage(
            user.email,
            "Iowa Service Dogs Event Reminder",
            `You've registered for ${event.title} event.`
        );

        if (!messageSent) {
          functions.logger.error(`Failed to send email to ${user.email}`);
        }
      });

      await Promise.all(messages);
    });
