import { createPortal } from "react-dom";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

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
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const dialog = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    const modal = dialog.current;
    if (open) {
      setIsTransitioning(true);
      modal?.showModal();
    } else {
      setIsTransitioning(false);
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
      className={`backdrop:bg-black/60 border-none p-4 min-w-80 w-[30%] rounded-lg shadow-lg ${className}
        ${
          isTransitioning
            ? "opacity-100 -translate-y-0"
            : "opacity-0 -translate-y-10"
        } 
        transition-all duration-300
      `}
    >
      {open ? children : null}
    </dialog>,
    document.getElementById("modal-root")!
  );
}

export default Modal;
