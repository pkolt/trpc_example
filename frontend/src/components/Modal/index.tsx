import { useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { Modal as ModalBootstrap } from 'bootstrap';
import { useBoolean } from 'react-use';

type ModalProps = React.PropsWithChildren<{
  title: string;
  onClose: () => void;
  acceptButton?: {
    text: string;
    handler: () => Promise<void>;
  };
}>;

export const Modal: React.FC<ModalProps> = ({ title, onClose, acceptButton, children }) => {
  const [loading, setLoading] = useBoolean(false);
  const [modal, setModal] = useState<ModalBootstrap | null>(null);

  const handleClose = useCallback(() => {
    if (!loading) {
      if (modal) {
        modal.hide();
      }
      onClose();
    }
  }, [loading, modal, onClose]);

  const handleAccept = useCallback(async () => {
    if (acceptButton) {
      setLoading(true);
      await acceptButton.handler();
      setLoading(false);
      handleClose();
    }
  }, [acceptButton, handleClose, setLoading]);

  const setModalRef = useCallback(
    (elem: HTMLDivElement | null) => {
      if (!elem) {
        setModal(null);
        return;
      }
      const modalInstance = ModalBootstrap.getOrCreateInstance(elem);
      // Отобразить модальное окно при монтировании компонента
      modalInstance.show();
      // Подписка на событие закрытия окна (при клике по области вне окна нужно выполнить обработчик закрытия)
      // https://github.com/twbs/bootstrap/blob/main/js/src/modal.js
      if (elem && handleClose) {
        elem.addEventListener('hidden.bs.modal', handleClose);
      }
      setModal(modalInstance);
    },
    [handleClose],
  );

  const element = (
    <div className="modal" tabIndex={-1} ref={setModalRef}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" aria-label="Закрыть" onClick={handleClose} />
          </div>
          <div className="modal-body">{children}</div>
          {acceptButton && (
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleClose} disabled={loading}>
                Отмена
              </button>
              <button type="button" className="btn btn-primary" onClick={handleAccept} disabled={loading}>
                {acceptButton.text}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const modalRoot = document.getElementById('modal');
  if (modalRoot) {
    return createPortal(element, modalRoot);
  }
  return null;
};
