export default function RemoveCard({ onDeleteCard, isLoading }) {
  function handleSubmit(e) {
    e.preventDefault();
    onDeleteCard();
  }

  return (
    <form className="popup__form" onSubmit={handleSubmit} noValidate>
      <button type="submit" className="popup__submit">
        {isLoading ? "Excluindo..." : "Sim"}
      </button>
    </form>
  );
}
