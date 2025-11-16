import { useContext } from "react";
import CurrentUserContext from "../../../../contexts/CurrentUserContext";

export default function Card({
  card,
  handleCardClick,
  handleCardLike,
  handleOpenDeletePopup,
}) {
  const currentUser = useContext(CurrentUserContext);

  if (!card || !currentUser) return null;

  const likes = Array.isArray(card.likes) ? card.likes : [];
  const ownerId = card.owner?._id || "";
  const currentUserId = currentUser._id || "";

  const isOwn = ownerId === currentUserId;
  const isLiked = likes.some((like) => like?._id === currentUserId);

  function handleImageClick() {
    handleCardClick?.(card);
  }

  function handleLikeClick() {
    handleCardLike?.(card);
  }

  function handleDeleteClick() {
    handleOpenDeletePopup?.(card._id);
  }

  return (
    <li className="elements__card">
      <img
        className="elements__image"
        src={card.link || ""}
        alt={card.name || "Imagem do card"}
        onClick={handleImageClick}
      />
      {isOwn && (
        <button
          aria-label="Excluir cartão"
          className="elements__delete"
          type="button"
          onClick={handleDeleteClick}
        />
      )}
      <div className="elements__info">
        <p className="elements__text">{card.name || "Sem título"}</p>
        <div className="elements__like-container">
          <button
            aria-label="Curtir cartão"
            type="button"
            className={`elements__like ${
              isLiked ? "elements__like_active" : ""
            }`}
            onClick={handleLikeClick}
          />
          <span className="elements__like-counter">{likes.length}</span>
        </div>
      </div>
    </li>
  );
}
