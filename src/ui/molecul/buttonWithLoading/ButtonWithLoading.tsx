/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.css";
import { ReactNode, useEffect, useRef, useState } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import LoadingDots from "../../atom/loading-dots/LoadingDots";

interface ButtonWithLoadingComponent {
  children?: ReactNode;
  action?: (payload?: any, e?: any) => void;
  finishAction?: () => void;
  payload?: any;
  disabled?: boolean;
  bgColor?: string;
  needConfirm?: boolean;
  alert?: boolean;
}

export default function ButtonWithLoading({
  children = "action",
  action = () => {},
  finishAction = () => {},
  payload = null,
  disabled = false,
  bgColor = "",
  needConfirm = false,
  alert = false,
}: ButtonWithLoadingComponent) {
  const [isActionStatus, setIsActionStatus] = useState(1);

  const button = useRef<null | any>(null);

  const actionWithLoading = () => {
    if (needConfirm) {
      const agree = confirm(`Delete all actions that activity?`);
      if (agree) {
        setIsActionStatus(2);
      }
    } else {
      setIsActionStatus(2);
    }
  };
  useEffect(() => {
    let timer = 0;
    if (isActionStatus === 2) {
      setIsActionStatus(3);
    }
    if (isActionStatus === 3) {
      action(payload);

      timer = setTimeout(() => setIsActionStatus(4), 300);
    }
    if (isActionStatus === 4) {
      clearTimeout(timer);
      finishAction();
      timer = setTimeout(() => setIsActionStatus(1), 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isActionStatus]);
  return (
    <ActionButton
      refer={button}
      actionWithPayload={actionWithLoading}
      disabled={disabled || isActionStatus === 2 || isActionStatus === 3}
      bgColor={bgColor}
      alert={alert}
    >
      {isActionStatus === 2 || isActionStatus === 3 ? (
        <LoadingDots>{children}</LoadingDots>
      ) : (
        children
      )}
    </ActionButton>
  );
}
