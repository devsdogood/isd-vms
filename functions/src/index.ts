import * as functions from "firebase-functions";
import {firestore} from "firebase-admin";
import moment from "moment";
import _ from "lodash";

import {admin, DOMAIN} from "./utils";
import {defaultAdminUserData, getUserData} from "./users/utils";
import {getEventData, getRoleData} from "./events/utils";
import {
  eventDataProps,
  sendMessage,
  timeDisplayFormat,
  templates,
} from "./mailing/utils";

// send email when user registers for an event
export const registration = functions.firestore
    .document("eventSignups/{docId}")
    .onCreate(async (snapshot, context) => {
      const data = snapshot.data();
      const userData = await getUserData(data.volunteer);
      const eventData = await getEventData(data.event);
      const roleData = await getRoleData(data.role);

      // get role user registered for from event data
      const {shiftStart, shiftEnd} = eventData.roles.find(
          ({role}: { role: firestore.DocumentReference }) =>
            role.id === data.role
      );

      // context for Mailjet templating
      const variables = {
        ..._.pick(eventData, eventDataProps),
        id: data.event,
        role: roleData.title,
        shiftStart: moment(shiftStart).format(timeDisplayFormat),
        shiftEnd: moment(shiftEnd).format(timeDisplayFormat),
        domain: DOMAIN,
      };

      const messageSent = await sendMessage(
          userData.email,
          "You're Registered!",
          templates.registration,
          variables,
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
        const role = await getRoleData(signup.role);

        // get role user registered for from event data
        const {shiftStart, shiftEnd} = event.roles.find(
            ({role}: { role: firestore.DocumentReference }) =>
              role.id === signup.role
        );

        // context for Mailjet templating
        const variables = {
          ..._.pick(event, eventDataProps),
          id: signup.event,
          role: role.title,
          shiftStart: moment(shiftStart).format(timeDisplayFormat),
          shiftEnd: moment(shiftEnd).format(timeDisplayFormat),
          domain: DOMAIN,
        };

        const messageSent = await sendMessage(
            user.email,
            "Iowa Service Dogs Event Reminder",
            templates.notification,
            variables,
        );

        if (!messageSent) {
          functions.logger.error(`Failed to send email to ${user.email}`);
        }
      });

      await Promise.all(messages);
    });

// send emails to user and admins on user registration
// also create user admin document
export const userRegistration = functions.firestore
    .document("users/{docId}")
    .onCreate(async (snapshot) => {
      await admin
          .firestore()
          .collection("adminUserData")
          .doc(snapshot.id)
          .set(defaultAdminUserData);

      // TODO: send email
    });
