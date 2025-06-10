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
              data: { url: self.location.origin }, //@ts-expect-error notif
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
                //@ts-expect-error notif
                e.action ===
                `stop${action.activity.name + action.activity.color}`
              ) {
                stopAction(action.activity);
              }
              //@ts-expect-error notif
              e.waitUntil(
                //@ts-expect-error notif
                clients.matchAll({ type: "window" }).then((clientsArr) => {
                  // Если вкладка, соответствующая целевому URL-адресу, уже существует, сфокусируйтесь на ней;
                  //@ts-expect-error notif
                  const hadWindowToFocus = clientsArr.some((windowClient) =>
                    //@ts-expect-error notif
                    windowClient.url === e.notification.data.url
                      ? (windowClient.focus(), true)
                      : false
                  );
                  // В противном случае откройте новую вкладку для соответствующего URL-адреса и сфокусируйте её.
                  if (!hadWindowToFocus)
                    //@ts-expect-error notif
                    clients //@ts-expect-error notif
                      .openWindow(e.notification.data.url) //@ts-expect-error notif
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
