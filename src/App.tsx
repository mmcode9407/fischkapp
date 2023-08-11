import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import { NewCard } from "./components/NewCard";
import { FlashCard } from "./components/FlashCard";

import "./App.css";
import { useState } from "react";
import { IFlashCard, IFlashCardObj } from "./types/types";

function App() {
  const [flashCardsList, setFlashCardList] = useState<IFlashCardObj[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAddCard = () => setIsAdding(prev => !prev);

  const handleCancel = () => setIsAdding(false);

  const handleSave = (flashCard: IFlashCard) => {
    const id =
      flashCardsList.reduce((acc, next) => {
        return acc < next.id ? next.id : acc;
      }, 0) + 1;
    const newFlashCard: IFlashCardObj = { ...flashCard, id };

    setFlashCardList([...flashCardsList, newFlashCard]);
  };

  const handleSaveEditing = (index: number, field: string, newText: string) => {
    setFlashCardList(prev => {
      const updatedCards = [...prev];

      updatedCards[index] = { ...updatedCards[index], [field]: newText };

      return updatedCards;
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
                key={card.id}
                cardContent={card}
                index={idx}
                onSave={handleSaveEditing}
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
