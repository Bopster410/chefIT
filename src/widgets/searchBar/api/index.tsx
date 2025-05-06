import React, { useState } from "react";

function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue);
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }
  return [value, handleChange] as const;
}

export default useInput;
