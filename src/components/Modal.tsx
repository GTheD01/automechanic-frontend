import { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
}

function Modal({ open, onClose, children }: PropsWithChildren<ModalProps>) {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (open) {
      dialog?.current?.showModal();
    } else {
      dialog?.current?.close();
    }
  }, [open]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === dialog.current) {
      onClose();
    }
  };

  return createPortal(
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={handleBackdropClick}
      className="backdrop:bg-black/60 bg-neutral border-none p-4 min-w-80 w-[30%] rounded-lg shadow-lg"
    >
      {open ? children : null}
    </dialog>,
    document.getElementById("modal-root")!
  );
}

export default Modal;
