export type AdditionalCard = {
    id: string;
    title: string;
    imageSrc: string;
    href: string;
  };
  
  export type PopupContent = {
    title: string;
    additionalCardsFile: string;
    additionalCards?: AdditionalCard[];
  };
  
  export type Card = {
    id: string;
    title: string;
    imageSrc: string;
    popupContent: PopupContent;
  };
  