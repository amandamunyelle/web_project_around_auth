import { useState, useEffect } from "react";

export default function EditProfile({ currentUser, onUpdateUser, isLoading }) {
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    if (currentUser?.name && currentUser?.about) {
      setName(currentUser.name);
      setAbout(currentUser.about);
    }
  }, [currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name, about });
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="name"
        placeholder="Nome"
        className="popup__input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        minLength="2"
        maxLength="40"
      />
      <span className="popup__form-error" id="name-error"></span>

      <input
        type="text"
        name="about"
        placeholder="Sobre mim"
        className="popup__input"
        value={about}
        onChange={(e) => setAbout(e.target.value)}
        required
        minLength="2"
        maxLength="200"
      />
      <span className="popup__form-error" id="about-error"></span>

      <button type="submit" className="popup__submit">
        {isLoading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
