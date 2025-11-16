import { useState, useContext } from "react";
import Card from "./components/Card/Card.jsx";
import Popup from "./components/Popup/Popup";
import NewCard from "./components/Popup/components/NewCard/NewCard.jsx";
import EditProfile from "./components/Popup/components/EditProfile/EditProfile";
import EditAvatar from "./components/Popup/components/EditAvatar/EditAvatar";
import RemoveCard from "./components/Popup/components/RemoveCard/RemoveCard";
import ImagePopup from "./components/Popup/components/ImagePopup/ImagePopup";
import editButton from "../../images/edit_button.png";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Main({
  cards,
  onUpdateUser,
  onUpdateAvatar,
  onAddPlace,
  onCardLike,
  onDeleteCard,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);
  const [popup, setPopup] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [cardToDelete, setCardToDelete] = useState(null);

  function handleOpenPopup(popupConfig) {
    setPopup(popupConfig);
  }

  function handleClosePopup() {
    setPopup(null);
    setSelectedCard(null);
    setCardToDelete(null);
  }

  function handleOpenDeletePopup(cardId) {
    setCardToDelete(cardId);
    handleOpenPopup({
      title: "Tem certeza?",
      children: (
        <RemoveCard
          onDeleteCard={() => {
            onDeleteCard(cardId);
            handleClosePopup();
          }}
          isLoading={isLoading}
        />
      ),
    });
  }

  const newCardPopup = {
    title: "Novo local",
    children: (
      <NewCard
        onAddCard={(data) => {
          onAddPlace(data);
          handleClosePopup();
        }}
        isLoading={isLoading}
      />
    ),
  };

  const editProfilePopup = {
    title: "Editar perfil",
    children: (
      <EditProfile
        onUpdateUser={(data) => {
          onUpdateUser(data);
          handleClosePopup();
        }}
        isLoading={isLoading}
      />
    ),
  };

  const editAvatarPopup = {
    title: "Atualizar avatar",
    children: (
      <EditAvatar
        onUpdateAvatar={(data) => {
          onUpdateAvatar(data);
          handleClosePopup();
        }}
        isLoading={isLoading}
      />
    ),
  };

  return (
    <main>
      <section className="profile page__section">
        <div className="profile__info">
          <div className="profile__avatar-wrapper">
            <img
              src={currentUser.avatar}
              alt="imagem do perfil"
              className="profile__avatar"
            />
            <button
              className="profile__avatar-edit"
              aria-label="Editar avatar"
              onClick={() => handleOpenPopup(editAvatarPopup)}
            />
          </div>
          <div className="profile__info-text">
            <div className="profile__user">
              <h1 className="profile__user-name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                onClick={() => handleOpenPopup(editProfilePopup)}
              >
                <img
                  src={editButton}
                  alt="icone de edição"
                  className="profile__image-edit-button"
                />
              </button>
            </div>
            <p className="profile__description">{currentUser.about}</p>
          </div>
        </div>

        <button
          className="profile__add-button"
          aria-label="Adicionar cartão"
          type="button"
          onClick={() => handleOpenPopup(newCardPopup)}
        />
      </section>

      <section className="elements page__section">
        <ul className="elements__cards">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              handleCardClick={setSelectedCard}
              handleCardLike={onCardLike}
              handleOpenDeletePopup={handleOpenDeletePopup}
            />
          ))}
        </ul>
      </section>

      {popup && (
        <Popup onClose={handleClosePopup} title={popup.title}>
          {popup.children}
        </Popup>
      )}

      {selectedCard && (
        <Popup onClose={handleClosePopup} type="image" isOpen={true}>
          <ImagePopup card={selectedCard} />
        </Popup>
      )}
    </main>
  );
}
