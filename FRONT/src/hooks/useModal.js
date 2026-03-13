import { useState } from 'react';

const useModal = () => {
  const [item, setItem] = useState(null);
  const [open, setOpen] = useState(false);

  const openSelectedItemModal = (selectedItem) => {
    setItem(selectedItem);
    setOpen(true);
  };

  return { item, setItem, open, setOpen, openSelectedItemModal };
};

export default useModal;
