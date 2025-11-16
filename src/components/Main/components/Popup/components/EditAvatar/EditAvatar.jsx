import { useState, useEffect } from "react";

export default function EditAvatar({ onUpdateAvatar, isLoading }) {
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    setAvatar("");
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({ avatar });
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit} noValidate>
      <input
        type="url"
        name="avatar"
        placeholder="Link da nova imagem"
        className="popup__input"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        required
      />
      <span className="popup__form-error" id="avatar-error"></span>
      <button type="submit" className="popup__submit">
        {isLoading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
