import "./style.css";
import useActionsStore from "../../store/actionsStore";
import Actions from "../../view/actions/Actions";

export default function ActionsPage() {
  return <Actions useActionsStore={useActionsStore} />;
}
