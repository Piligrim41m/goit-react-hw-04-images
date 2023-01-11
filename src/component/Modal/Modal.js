import { useEffect } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';
export default function Modal({ onClose, children }) {
  useEffect(() => {
    const handleKeyDown = evt => {
      if (evt.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);
  const handleOverlayClick = evt => {
    if (evt.currentTarget === evt.target) {
      onClose();
    }
  };
  return (
    <div className={css.overlay} onClick={handleOverlayClick}>
      <div className={css.modal}>{children}</div>
    </div>
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
};

// import { useEffect } from 'react';
// // import { createPortal } from 'react-dom';
// import ReactDOM from 'react-dom/client';
// import PropTypes from 'prop-types';
// import s from './Modal.module.css';

// const rootModal = document.querySelector('#rootModal');

// function Modal({ onClose, children }) {
//   useEffect(() => {
//     window.addEventListener('keydown', handleKeydown);
//     return () => {
//       window.removeEventListener('keydown', handleKeydown);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   const handleKeydown = e => {
//     if (e.code === 'Escape') {
//       onClose();
//     }
//   };

//   const handleOverlayClick = e => {
//     if (e.currentTarget === e.target) {
//       onClose();
//     }
//   };

//   return ReactDOM.createPortal(
//     <div className={s.overlay} onClick={handleOverlayClick}>
//       <div className={s.modal}> {children}</div>
//     </div>,
//     rootModal,
//   );
// }

// Modal.propTypes = {
//   onClose: PropTypes.func,
// };

// export default Modal;