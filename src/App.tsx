import { AppHeader } from "./components/AppHeader";
import { AppLayout } from "./components/AppLayout";
import { NewCard } from "./components/NewCard";
import { FlashCard } from "./components/FlashCard";

import "./App.css";
import { useState } from "react";
import { IFlashCard } from "./types/types";

interface IFlashCardObj extends IFlashCard {
  id: number;
}

function App() {
  const [flashCardsList, setFlashCardList] = useState<IFlashCardObj[]>([]);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const handleAddCard = () => {
    setIsAdding((prev) => !prev);
  };

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleSave = (flashCard: IFlashCard) => {
    const id =
      flashCardsList.reduce((acc, next) => {
        return acc < next.id ? next.id : acc;
      }, 0) + 1;
    const newFlashCard = { ...flashCard, id };

    setFlashCardList([...flashCardsList, newFlashCard]);
  };

  return (
    <AppLayout>
      <AppHeader cardsQty={flashCardsList.length} onClick={handleAddCard} />
      <section className="section">
        {isAdding && <NewCard onCancel={handleCancel} onSave={handleSave} />}
        <ul className="cardsContainer">
          {flashCardsList.map((card) => (
            <FlashCard key={card.id} />
          ))}
        </ul>
      </section>
    </AppLayout>
  );
}

export default App;
