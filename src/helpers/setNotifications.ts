/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { Action, Activity } from "../interfaces";
import getSvgForNotification from "./getSvgForNotification";

export default function setNotifications(
  actions: Action[],
  getActivitiesInAction: (actions: Action[]) => Action[],
  stopAction: (activity: Activity) => void
) {
  // eslint-disable-next-line prefer-const
  let notificationsCreated = new Set<string>(); // Хранит уже созданные уведомления

  Notification.requestPermission().then((result) => {
    console.log("Notification Permission:", result);
    if (result === "granted") {
      const activitiesInAction = getActivitiesInAction(actions);
      if (activitiesInAction.length) {
        navigator.serviceWorker.ready.then(async (registration) => {
          for (const action of activitiesInAction) {
            const notificationTag = `${
              action.activity.name + action.activity.color
            }`;

            if (notificationsCreated.has(notificationTag)) {
              console.log(
                `Skipping duplicate notification: ${notificationTag}`
              );
              continue; // Пропускаем создание дубликатов
            }

            console.log("Creating notification for:", action.activity.name);
            await registration.showNotification(action.activity.name, {
              badge: "./images/notif-icon.png",
              body: `in action`,
              icon: getSvgForNotification(
                action.activity.color,
                action.activity.name[0]
              ),
              tag: notificationTag,
              data: { url: self.location.origin },
              timestamp: action.startTime,
              actions: [
                {
                  action: `stop${notificationTag}`,
                  title: `stop ${action.activity.name}`,
                },
              ],
            });

            notificationsCreated.add(notificationTag);
          }
        });

        // Глобальный обработчик событий для кликов по уведомлениям
        self.addEventListener("notificationclick", (e) => {
          console.log("Notification clicked:", e.notification.tag);
          console.log("Action triggered:", e.action);

          const clickedActivity = activitiesInAction.find(
            (action) =>
              e.notification.tag ===
              `${action.activity.name + action.activity.color}`
          );

          if (clickedActivity && e.action.startsWith("stop")) {
            console.log("Stopping activity:", clickedActivity.activity.name);
            stopAction(clickedActivity.activity);
            notificationsCreated.delete(e.notification.tag); // Удаляем из списка активных уведомлений
          }

          e.waitUntil(
            clients.matchAll({ type: "window" }).then((clientsArr) => {
              console.log("Matching clients:", clientsArr);

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

        // Очистка устаревших уведомлений
        navigator.serviceWorker.ready.then((registration) => {
          registration.getNotifications().then((notifications) => {
            console.log(
              "Existing notifications:",
              notifications.map((n) => n.tag)
            );
            notifications.forEach((notification) => {
              if (
                !activitiesInAction.find(
                  (a) => a.activity.name === notification.tag
                )
              ) {
                console.log("Closing notification:", notification.tag);
                notification.close();
                notificationsCreated.delete(notification.tag);
              }
            });
          });
        });
      } else {
        console.log("No active activities, clearing all notifications.");
        navigator.serviceWorker.ready.then((registration) => {
          registration.getNotifications().then((notifications) => {
            notifications.forEach((notification) => {
              notification.close();
              notificationsCreated.delete(notification.tag);
            });
          });
        });
      }
    }
  });
}
