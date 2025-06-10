import { Action } from "../interfaces";

export default function setBadges(actions: Action[]) {
  if (navigator.setAppBadge) {
    const actionsCount = actions.filter((a) => !a.endTime).length;
    if (actionsCount) {
      navigator
        .setAppBadge(actions.filter((a) => !a.endTime).length)
        .catch((error) => {
          console.log(error);
        });
    } else {
      navigator.clearAppBadge().catch((error) => {
        console.log(error);
      });
    }
  }
}
