import { useState } from 'react';

export default function useHandleChange(initialState) {
  const [value, setValue] = useState(initialState);
  function handleChange(e) {
    setValue({ ...value, [e.target.name]: e.target.value });
  }
  return [value, handleChange];
}
