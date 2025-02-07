import { PropsWithChildren, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  className?: string;
}

function Modal({
  children,
  open,
  onClose,
  className,
}: PropsWithChildren<ModalProps>) {
  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      modal?.showModal();
    }

    return () => modal?.close();
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
      className={`backdrop:bg-black/60 border-none p-4 min-w-80 w-[30%] rounded-lg shadow-lg ${className}`}
    >
      {open ? children : null}
    </dialog>,
    document.getElementById("modal-root")!
  );
}

export default Modal;
