import closeButton from "../../../../images/close-button.png";

export default function Popup({
  onClose,
  title,
  children,
  isOpen,
  type = "form",
}) {
  const popupClassName =
    type === "image"
      ? `popup popup-image ${isOpen ? "popup_opened" : ""}`
      : `popup ${isOpen ? "popup_opened" : ""}`;

  return (
    <div className={popupClassName}>
      <div
        className={
          type === "image" ? "popup-image__container" : "popup__container"
        }
      >
        <button
          aria-label="Fechar"
          className={
            type === "image" ? "popup-image__close-button" : "popup__close"
          }
          type="button"
          onClick={onClose}
        >
          <img src={closeButton} alt="Fechar" className="popup__close-icon" />
        </button>
        {title && <h3 className="popup__title">{title}</h3>}
        {children}
      </div>
    </div>
  );
}
