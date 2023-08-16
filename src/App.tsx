import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import { NewCard } from "./components/NewCard";
import { FlashCard } from "./components/FlashCard";
import { Loader } from "./components/Loader";

import "./App.css";
import { useState } from "react";
import { IFlashCard } from "./types/types";
import { initialCards } from "./data/initialCards";

import { editFlashCard, postNewFlashCard } from "./api/API";

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

  const handleSaveEditing = async (
    index: string,
    field: string,
    newText: string,
  ) => {
    setLoading(true);

    const newData = {
      [field]: newText,
    };

    try {
      const data: any = await editFlashCard(newData, index);
      console.log(data);

      setFlashCardList(prev => {
        const updatedCards: IFlashCard[] = [...prev].map(card => {
          if (card._id === index) {
            return { ...card, [field]: newText };
          }
          return card;
        });

        return updatedCards;
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCard = (index: string) => {
    setFlashCardList(prev => {
      const cardAfterRemoving = prev.filter(card => card._id !== index);

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
            {flashCardsList.map(card => (
              <FlashCard
                key={card._id}
                cardContent={card}
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
