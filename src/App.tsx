import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import { NewCard } from "./components/NewCard";
import { FlashCard } from "./components/FlashCard";
import { Loader } from "./components/Loader";

import "./App.css";
import { useState } from "react";
import { IFlashCard } from "./types/types";
import { initialCards } from "./data/initialCards";

import { postNewFlashCard } from "./api/API";

function App() {
  const [flashCardsList, setFlashCardList] =
    useState<IFlashCard[]>(initialCards);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddCard = () => setIsAdding(prev => !prev);

  const handleCancel = () => setIsAdding(false);

  const handleSave = async (flashCard: IFlashCard) => {
    setLoading(true);

    try {
      const data: any = await postNewFlashCard(flashCard);

      setFlashCardList([...flashCardsList, data.flashcard]);
      setIsAdding(false);
    } catch (err) {
      alert(err);
    } finally {
      setLoading(false);
    }
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
      {loading && <Loader />}
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
