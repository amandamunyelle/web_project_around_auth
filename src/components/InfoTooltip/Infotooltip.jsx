export default function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <div
          className={`popup__icon ${
            isSuccess ? "popup__icon_success" : "popup__icon_fail"
          }`}
        />
        <p className="popup__text">
          {isSuccess
            ? "Registro realizado com sucesso!"
            : "Algo deu errado. Tente novamente."}
        </p>
        <button className="popup__close" onClick={onClose} />
      </div>
    </div>
  );
}
