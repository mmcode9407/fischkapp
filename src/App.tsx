import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import { NewCard } from "./components/NewCard";
import { FlashCard } from "./components/FlashCard";

import "./App.css";
import { useState } from "react";
import { IFlashCard } from "./types/types";
import { initialCards } from "./data/initialCards";

import { post } from "./api/API";

function App() {
  const [flashCardsList, setFlashCardList] =
    useState<IFlashCard[]>(initialCards);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAddCard = () => setIsAdding(prev => !prev);

  const handleCancel = () => setIsAdding(false);

  const handleSave = async (flashCard: IFlashCard) => {
    post(flashCard).then(data =>
      setFlashCardList([...flashCardsList, data.flashcard]),
    );
  };

  const handleSaveEditing = (index: number, field: string, newText: string) => {
    setFlashCardList(prev => {
      const updatedCards = [...prev];

      updatedCards[index] = { ...updatedCards[index], [field]: newText };

      return updatedCards;
    });
  };

  const handleDeleteCard = (index: number) => {
    setFlashCardList(prev => {
      const cardAfterRemoving = prev.filter((card, idx) => idx !== index);

      return cardAfterRemoving;
    });
  };

  return (
    <AppLayout>
      <AppHeader cardsQty={flashCardsList.length} onClick={handleAddCard} />
      <section className="section">
        {isAdding && <NewCard onCancel={handleCancel} onSave={handleSave} />}
        {flashCardsList.length > 0 ? (
          <ul className="cardsContainer">
            {flashCardsList.map((card, idx) => (
              <FlashCard
                key={idx}
                cardContent={card}
                index={idx}
                onSave={handleSaveEditing}
                onDelete={handleDeleteCard}
              />
            ))}
          </ul>
        ) : (
          <p className="emptyText">Add your first flashcard</p>
        )}
      </section>
    </AppLayout>
  );
}

export default App;
