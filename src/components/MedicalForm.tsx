import Swal from "sweetalert2";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { ChangeEvent, SyntheticEvent } from "react";
import { registerNewMedicalRecord } from "../firebase/firebase";
import { useForm } from "../hooks/useForm";
import { MedicalModel } from "../types/MedicalModel";
import { Container, CustomCard } from ".";

export const MedicalForm = () => {
  const { values, handleInputChange, reset } = useForm<MedicalModel>({
    name: "",
    doctorName: "",
    sex: "",
    age: "",
    description: "",
  });

  const { name, description, doctorName, age, sex } = values;

  const genres = ["Men", "Women"];

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!genres.includes(sex)) {
      return Swal.fire("¡Upps!", "Select a sex", "error");
    }

    registerNewMedicalRecord({
      name,
      doctorName,
      sex,
      age: parseInt(age as string),
      description,
    });

    reset();
  };

  return (
    <CustomCard sx={{ boxShadow: 4 }}>
      <form onSubmit={handleSubmit}>
        <Container>
          <Typography variant="h5">New registration</Typography>
          <Box sx={{ height: 10 }} />
          <TextField
            label="Enter the doctor's name"
            value={doctorName}
            type="text"
            variant="filled"
            onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(target.value, "doctorName")
            }
            required
          />
          <Box sx={{ height: 20 }} />
          <TextField
            value={name}
            type="text"
            label="Enter the patient's name"
            variant="filled"
            onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(target.value, "name")
            }
            required
          />
          <Box sx={{ height: 20 }} />
          <TextField
            value={age}
            label="Please enter your age"
            inputProps={{ pattern: "[0-9]{1,3}" }}
            variant="filled"
            onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(target.value, "age")
            }
            required
          />
          <Box sx={{ height: 20 }} />
          <FormControl variant="filled">
            <InputLabel id="demo-simple-select-filled">
              Select the gender
            </InputLabel>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value={sex as any}
              label="Select gender"
              variant="filled"
              onChange={({ target }: SelectChangeEvent<HTMLInputElement>) =>
                handleInputChange(target.value as string, "sex")
              }
            >
              <MenuItem value="Men">Man</MenuItem>
              <MenuItem value="Women">Women</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ height: 20 }} />
          <TextField
            multiline
            rows={4}
            value={description}
            type="text"
            variant="filled"
            label="Type description"
            onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
              handleInputChange(target.value, "description")
            }
            required
          />
          <Box sx={{ height: 20 }} />
          <Button variant="contained" type="submit">
            {" "}
            Registrar{" "}
          </Button>
        </Container>
      </form>
    </CustomCard>
  );
};
