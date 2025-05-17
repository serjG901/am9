import "./style.css";
import { ReactNode } from "react";
import ActionButton from "../../atom/action-button/ActionButton";

interface ModalComponent {
  id?: string;
  children?: ReactNode;
  hideModal?: (isShow: boolean) => void;
}

export default function Modal({
  id = "modal",
  children = "children",
}: ModalComponent) {
  const hideModal = () => {
    const modalId = document.getElementById(id);
    modalId?.hidePopover();
  };
  return (
    <div
      className='modal'
      popover='manual'
      id={id}
      onClick={(e) => e.stopPropagation()}
    >
      <div className='modal-content'>{children}</div>
      <div className='hide-modal'>
        <ActionButton actionWithPayload={hideModal} attention>
          close
        </ActionButton>
      </div>
    </div>
  );
}
