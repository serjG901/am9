/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { Action, Activity } from "../interfaces";
import getSvgForNotification from "./getSvgForNotification";

export default function setNotifications(
  actions: Action[],
  getActivitiesInAction: (actions: Action[]) => Action[],
  stopAction: (activity: Activity) => void
) {
  Notification.requestPermission().then((result) => {
    if (result === "granted") {
      const activitiesInAction = getActivitiesInAction(actions);
      if (activitiesInAction.length) {
        navigator.serviceWorker.ready.then((registration) => {
          activitiesInAction.forEach((action) => {
            registration.showNotification(action.activity.name, {
              badge: "./images/notif-icon.png",
              body: `in action`,
              icon: getSvgForNotification(
                action.activity.color,
                action.activity.name[0]
              ),
              tag: `${action.activity.name + action.activity.color}`,
              data: { url: self.location.origin },
              timestamp: action.startTime,
              actions: [
                {
                  action: `stop${action.activity.name + action.activity.color}`,
                  title: `stop ${action.activity.name}`,
                },
              ],
            });
            self.addEventListener("notificationclick", (e) => {
              if (
                e.action ===
                `stop${action.activity.name + action.activity.color}`
              ) {
                stopAction(action.activity);
              }
              e.waitUntil(
                clients.matchAll({ type: "window" }).then((clientsArr) => {
                  const hadWindowToFocus = clientsArr.some((windowClient) =>
                    windowClient.url === e.notification.data.url
                      ? (windowClient.focus(), true)
                      : false
                  );
                  if (!hadWindowToFocus)
                    clients
                      .openWindow(e.notification.data.url)
                      .then((windowClient) =>
                        windowClient ? windowClient.focus() : null
                      );
                })
              );
            });
          });
        });
        navigator.serviceWorker.ready.then((registration) => {
          registration.getNotifications().then((notifications) => {
            notifications.forEach((notification) => {
              if (
                !activitiesInAction.find(
                  (a) => a.activity.name === notification.tag
                )
              ) {
                notification.close();
              }
            });
          });
        });
      } else {
        navigator.serviceWorker.ready.then((registration) => {
          registration.getNotifications().then((notifications) => {
            notifications.forEach((notification) => {
              notification.close();
            });
          });
        });
      }
    }
  });
}
