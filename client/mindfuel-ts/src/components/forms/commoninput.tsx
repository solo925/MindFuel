import React from 'react';
import TextField from '@mui/material/TextField';

interface InputFieldProps {
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
}

const InputField: React.FC<InputFieldProps> = ({ name, placeholder, value, onChange, type = 'text' }) => {
    return (
        <TextField
            label={placeholder}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            variant="outlined"
            fullWidth
        />
    );
};

export default InputField;
