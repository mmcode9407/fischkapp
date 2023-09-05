import { AppHeader } from "@components/AppHeader/AppHeader";
import { AppLayout } from "@components/AppLayout/AppLayout";
import { NewCard } from "@components/NewCard/NewCard";
import { FlashCard } from "@components/FlashCard/FlashCard";
import { Loader } from "@components/Loaders/Loader";
import { DeleteModal } from "@components/Modals/DeleteModal";

import "./App.css";
import { useEffect, useState } from "react";
import { CardSide, EditPayload, IFlashCard } from "@typings/types";

import {
  deleteFlashCard,
  editFlashCard,
  getFlashCards,
  postNewFlashCard,
} from "@/api/API";

function App() {
  const [flashCardsList, setFlashCardList] = useState<IFlashCard[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [isDeleted, setIsDeleted] = useState<boolean>(false);

  const handleAddCard = () => setIsAdding(prev => !prev);

  const handleCancel = () => setIsAdding(false);

  const handleSave = async (flashCard: IFlashCard) => {
    setLoading(true);

    try {
      const data: { flashcard: IFlashCard } = await postNewFlashCard(flashCard);

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
    field: CardSide,
    newText: string,
  ) => {
    setLoading(true);

    const newData: EditPayload = {
      [field]: newText,
    };

    try {
      await editFlashCard(newData, index);

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

  const handleDeleteCard = async (index: string) => {
    setLoading(true);

    try {
      await deleteFlashCard(index);

      setIsDeleted(true);

      setFlashCardList(prev => {
        return prev.filter(card => card._id !== index);
      });

      setTimeout(() => {
        setIsDeleted(false);
      }, 500);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const getFlashCardsFromAPI = async () => {
    setLoading(true);

    try {
      const data: IFlashCard[] = await getFlashCards();
      setFlashCardList(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFlashCardsFromAPI();
  }, []);

  return (
    <AppLayout>
      {isDeleted && <DeleteModal />}
      {loading && <Loader />}
      <AppHeader cardsQty={flashCardsList.length} onClick={handleAddCard} />
      <section className="section">
        {isAdding && <NewCard onCancel={handleCancel} onSave={handleSave} />}
        {flashCardsList.length > 0 ? (
          <ul className="cardsContainer">
            {[...flashCardsList].reverse().map(card => (
              <FlashCard
                key={card._id}
                cardContent={card}
                onSave={handleSaveEditing}
                onDelete={handleDeleteCard}
              />
            ))}
          </ul>
        ) : (
          <>
            {!isAdding && <p className="emptyText">Add your first flashcard</p>}
          </>
        )}
      </section>
    </AppLayout>
  );
}

export default App;
