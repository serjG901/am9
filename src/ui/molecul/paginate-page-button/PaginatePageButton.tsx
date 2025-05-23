/* eslint-disable @typescript-eslint/no-explicit-any */
import "./style.css";
import { useEffect, useRef, useState } from "react";
import ActionButton from "../../atom/action-button/ActionButton";
import LoadingDots from "../../atom/loading-dots/LoadingDots";
import correctionScrollPosition from "../../../helpers/correctionScrollPosition";

interface PaginatePageButtonComponent {
  dublicate?: boolean;
  pageNumber?: string | number;
  action?: (totalPages?: number) => void;
  pageActive?: number | number;
  direction?: "left" | "right" | "";
  disabled?: boolean;
}

export default function PaginatePageButton({
  dublicate = false,
  pageNumber = "",
  action = () => {},
  pageActive = 1,
  direction = "",
  disabled = false,
}: PaginatePageButtonComponent) {
  const [isActionStatus, setIsActionStatus] = useState(1);

  const button = useRef<null | any>(null);

  const actionWithLoading = () => {
    setIsActionStatus(2);
  };
  useEffect(() => {
    let timer = 0;
    if (isActionStatus === 2) {
      setIsActionStatus(3);
    }
    if (isActionStatus === 3) {
      action();

      timer = setTimeout(() => setIsActionStatus(4), 300);
    }
    if (isActionStatus === 4) {
      correctionScrollPosition(button.current);
      clearTimeout(timer);
      timer = setTimeout(() => setIsActionStatus(1), 2000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isActionStatus]);
  return (
    <div
      className={`paginate-page-button ${
        disabled || (!!pageActive && pageActive === pageNumber)
          ? "paginate-page-button_disabled"
          : ""
      }`}
    >
      <ActionButton
        refer={button}
        actionWithPayload={actionWithLoading}
        disabled={disabled || (!!pageActive && pageActive === pageNumber)}
        payload={
          !dublicate
            ? direction || pageNumber
            : !direction
            ? "dublicate" + pageNumber
            : "dublicate" + direction
        }
      >
        {isActionStatus === 2 || isActionStatus === 3 ? (
          <LoadingDots>
            {!direction ? (
              pageNumber
            ) : direction === "left" ? (
              <span>{"<"}</span>
            ) : (
              <span>{">"}</span>
            )}
          </LoadingDots>
        ) : !direction ? (
          pageNumber
        ) : direction === "left" ? (
          <span>{"<"}</span>
        ) : (
          <span>{">"}</span>
        )}
      </ActionButton>
    </div>
  );
}
