export default function ImagePopup({ card, isOpen, onClose }) {
  const { name, link } = card || {};

  if (!card) return null;

  return (
    <div className={`popup popup-image ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup-image__container">
        <button
          className="popup-image__close-button"
          type="button"
          aria-label="Fechar imagem"
          onClick={onClose}
        />
        <img
          src={link}
          alt={name || "Imagem ampliada"}
          className="popup-image__img"
        />
        {name && <p className="popup__caption">{name}</p>}
      </div>
    </div>
  );
}
