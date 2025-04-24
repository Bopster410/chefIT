import React, { useState } from 'react';

function useInput(initialValue: string) {
    const [value, setValue] = useState(initialValue);
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setValue(e.target.value);
    }

    function clearValue() {
        setValue('');
    }

    return [value, handleChange, clearValue] as const;
}

export default useInput;
