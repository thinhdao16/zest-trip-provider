import { FormControl } from '@mui/joy';
import { InputAdornment, TextField, TextFieldProps } from '@mui/material';
import FormLabel from "@mui/joy/FormLabel";

import clsx from 'clsx';
import { FormEvent } from 'react';
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
		<FormControl required>
			<FormLabel>{labels}</FormLabel>
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
