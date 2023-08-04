import { FormControl } from '@mui/joy';
import { FormLabel, InputAdornment, TextField, TextFieldProps } from '@mui/material';

import React, { FC, ChangeEventHandler, ReactNode } from 'react';

interface InputProps extends Omit<TextFieldProps, 'onChange'> {
	onChange: ChangeEventHandler<HTMLInputElement>;
	labels: string;
	icon: ReactNode;
	[rest: string]: any;
}
export const Input = ({
	labels,
	onChange,
	icon,
	...rest
}: InputProps) => {
	return (
		<FormControl required style={{marginBottom:"20px"}}>
			<FormLabel style={{fontWeight:600, color:"black"}}>{labels}</FormLabel>
			<TextField
				required
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							{icon}
						</InputAdornment>
					),
				}}
				className="input-form-text-ready"
				{...rest}
				onChange={onChange}
			/>
		</FormControl>

	);
};
