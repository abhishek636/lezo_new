'use client';

import { useState, useEffect } from "react";
import MarqueeBanner from "./components/MarqueeBanner";
import Logo from "./components/Logo";
import CardGrid from "./components/CardGrid";
import PopupModal from "./components/PopupModal";
import BackgroundVideo from "./components/BackgroundVideo";
import Footer from "./components/Footer";
import { Card, PopupContent, AdditionalCard } from "./components/types";

export default function Home() {
  const [cardsData, setCardsData] = useState<Card[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState<PopupContent | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const marqueeText = "OPERATING SYSTEM FOR AI AGENTS";

  useEffect(() => {
    fetch('/cardsData.json')
      .then(res => res.json())
      .then((data: Card[]) => setCardsData(data))
      .catch((err) => console.error("Error loading card data:", err));
  }, []);

  const openPopup = (card: Card) => {
    fetch(card.popupContent.additionalCardsFile)
      .then((res) => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then((additionalCards: AdditionalCard[]) => {
        setPopupContent({
          title: card.title, 
          ...((({ title, ...rest }) => rest)(card.popupContent)),
          additionalCards,
        });
        setIsPopupOpen(true);
      })
      .catch((err) => {
        console.error("Error loading additional cards:", err);
        alert("Failed to load additional cards. Please try again later.");
      });
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  };

  return (
    <div className="relative w-screen h-full overflow-hidden">
      <BackgroundVideo />
      <div className="relative w-screen h-full overflow-hidden">
        <MarqueeBanner text={marqueeText} />
        <Logo />
        <CardGrid cards={cardsData} onCardClick={openPopup} hide={isPopupOpen} />
        {isPopupOpen && popupContent && (
          <PopupModal content={popupContent} onClose={closePopup} />
        )}
        <Footer/>
      </div>
    </div>
  );
}
