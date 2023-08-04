import {
    BannerContainer,
    BannerContent,
    BannerMapContainer,
    CreateDescription,
    CreateIconContent,
    CreateTitleNullDes,
} from "../../../styles/createtour/createtour";
import { useStepContext } from "../context/ui/useStepContext";
import { TextField, InputAdornment } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormControl } from "@mui/joy";
import { GoLocation, GoPlusCircle } from "react-icons/go";

const Location: React.FC = () => {
    const { currentStep, updateFormValues } = useStepContext();
    const [formList, setFormList] = useState([
        {
            id: 0,
            value: "",
        },
    ]);
    useEffect(() => {
        updateFormValues(3, { Location: formList });
    }, [formList]);
    const addNewForm = () => {
        const newFormList = [...formList, { id: formList.length, value: "" }];
        setFormList(newFormList);
    };

    const handleFormChange = (id: number, value: string) => {
        const updatedFormList = formList.map((form) =>
            form.id === id ? { ...form, value } : form
        );
        setFormList(updatedFormList);
    };
    if (currentStep !== 5) {
        return null;
    }
    return (
        <BannerContainer>
            <BannerContent>
                <CreateTitleNullDes variant="h6">
                    where is the place you want for the tour?
                </CreateTitleNullDes>
                <CreateDescription>
                    Your address is only shared with guests after they have successfully.
                </CreateDescription>
                <BannerMapContainer>
                    {formList.map((form) => (
                        <FormControl required key={form.id}>
                            <TextField
                                required
                                fullWidth
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <GoLocation />
                                        </InputAdornment>
                                    ),
                                }}
                                value={form.value}
                                onChange={(e) => handleFormChange(form.id, e.target.value)}
                                className="input-form-text-location-ready"
                            />
                        </FormControl>
                    ))}
                    <CreateIconContent onClick={addNewForm}>
                        <GoPlusCircle />
                    </CreateIconContent>
                </BannerMapContainer>
            </BannerContent>
        </BannerContainer>
    );
};
export default Location;
