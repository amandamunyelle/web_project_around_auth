import { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext";
import Header from "./Header/Header";
import Main from "./Main/Main";
import Footer from "./Footer/Footer";
import Login from "./Login/Login";
import Register from "./Register/Register";
import ProtectedRoute from "./ProtectedRoute/ProtectedRoute";
import InfoTooltip from "./InfoTooltip/InfoTooltip";
import api from "../utils/api";
import * as auth from "../utils/auth";

export default function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const navigate = useNavigate();

  // Verifica token salvo
  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then(() => {
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => console.error("Token inválido:", err));
    }
  }, [navigate]);

  // Carregar dados se logado
  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, initialCards]) => {
          setCurrentUser(userData);
          setCards(initialCards);
        })
        .catch((err) => console.error("Erro ao carregar dados iniciais:", err));
    }
  }, [loggedIn]);

  // Atualizar perfil
  function handleUpdateUser(data) {
    setIsLoading(true);
    api
      .setUserInfo(data)
      .then(setCurrentUser)
      .catch((err) => console.error("Erro ao atualizar perfil:", err))
      .finally(() => setIsLoading(false));
  }

  // Atualizar avatar
  function handleUpdateAvatar(data) {
    setIsLoading(true);
    api
      .setUserAvatar(data)
      .then(setCurrentUser)
      .catch((err) => console.error("Erro ao atualizar avatar:", err))
      .finally(() => setIsLoading(false));
  }

  //  Novo card
  function handleAddPlace(data) {
    setIsLoading(true);
    api
      .addNewCard(data)
      .then((newCard) => setCards([newCard, ...cards]))
      .catch((err) => console.error("Erro ao adicionar card:", err))
      .finally(() => setIsLoading(false));
  }

  // Excluir card
  function handleCardDelete(cardId) {
    setIsLoading(true);
    api
      .deleteCard(cardId)
      .then(() => setCards((state) => state.filter((c) => c._id !== cardId)))
      .catch((err) => console.error("Erro ao excluir card:", err))
      .finally(() => setIsLoading(false));
  }

  //  Curtir card
  function handleCardLike(card) {
    const isLiked = card.likes?.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) =>
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      )
      .catch((err) => console.error("Erro ao curtir:", err));
  }

  // Registro
  function handleRegister(email, password) {
    auth
      .register(email, password)
      .then(() => {
        setIsSuccess(true);
        setIsTooltipOpen(true);
        navigate("/signin");
      })
      .catch(() => {
        setIsSuccess(false);
        setIsTooltipOpen(true);
      });
  }

  // Login
  function handleLogin(email, password) {
    auth
      .authorize(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setLoggedIn(true);
        navigate("/");
      })
      .catch(() => {
        setIsSuccess(false);
        setIsTooltipOpen(true);
      });
  }

  // Logout
  function handleLogout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    navigate("/signin");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">
        <Header loggedIn={loggedIn} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Main
                  cards={cards}
                  onUpdateUser={handleUpdateUser}
                  onUpdateAvatar={handleUpdateAvatar}
                  onAddPlace={handleAddPlace}
                  onCardLike={handleCardLike}
                  onDeleteCard={handleCardDelete}
                  isLoading={isLoading}
                />
                <Footer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/signup"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/signin" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/signin" />} />
        </Routes>
        <InfoTooltip
          isOpen={isTooltipOpen}
          isSuccess={isSuccess}
          onClose={() => setIsTooltipOpen(false)}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}
