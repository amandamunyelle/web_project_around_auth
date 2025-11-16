import { useState } from "react";

export default function NewCard({ onAddCard, isLoading }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onAddCard({ name, link });
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="name"
        placeholder="Título"
        className="popup__input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        minLength="1"
        maxLength="30"
      />
      <span className="popup__form-error" id="title-error"></span>
      <input
        type="url"
        name="link"
        placeholder="Link da imagem"
        className="popup__input"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        required
      />
      <span className="popup__form-error" id="link-error"></span>
      <button type="submit" className="popup__submit">
        {isLoading ? "Criando..." : "Criar"}
      </button>
    </form>
  );
}
