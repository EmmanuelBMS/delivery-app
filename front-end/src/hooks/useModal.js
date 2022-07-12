import { useState } from 'react';

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  function toggleModal() {
    setIsOpen(!isOpen);
  }
  return [isOpen, toggleModal];
}
