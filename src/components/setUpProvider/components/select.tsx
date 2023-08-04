// import { FormControl, InputAdornment, Select, SelectChangeEvent, TextFieldProps } from '@mui/material';
// import FormLabel from "@mui/joy/FormLabel";
// import React, { ChangeEventHandler, ReactNode } from 'react';

// interface SelectProps extends Omit<TextFieldProps, 'onChange'> {
//     onChange: (event: SelectChangeEvent<{ value: unknown }>, child: ReactNode) => void;
//     labels: string;
//     icon: ReactNode;
//     value?:string | { value: unknown } | undefined;
// }

// export const SelectDesign = ({
//     labels,
//     onChange,
//     icon,
//     value,
//     ...rest
// }: SelectProps) => {
//     return (
//         <FormControl required>
//             <FormLabel>{labels}</FormLabel>
//             <Select
//                 required
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             {icon}
//                         </InputAdornment>
//                     ),
//                 }}
//                 className="input-form-text-ready"
//                 {...rest}
//                 value={value}
//                 onChange={onChange}
//             />
//         </FormControl>
//     );
// };
