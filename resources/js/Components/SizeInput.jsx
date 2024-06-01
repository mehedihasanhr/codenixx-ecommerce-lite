import React from 'react';
import { Input } from './ui/input';

export function SizeInput({onTab}) {
    const [value,setValue] = React.useState('');
  return (
    <Input
        type="text"
        placeholder="Press Enter to add"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
            if(e.key === 'Enter'){
                e.preventDefault();
                onTab(value)
                setValue("")
            }
        }}
    />
  )
}
