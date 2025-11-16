import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(email, password);
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Cadastro</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          required
          className="auth__input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Senha"
          required
          className="auth__input"
        />
        <button type="submit" className="auth__button">
          Cadastrar
        </button>
      </form>
      <p className="auth__text">
        Já tem uma conta?{" "}
        <Link to="/signin" className="auth__link">
          Entrar
        </Link>
      </p>
    </div>
  );
}
