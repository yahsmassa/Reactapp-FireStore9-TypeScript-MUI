import { ChangeEvent, useEffect, useState } from "react";
import {
  Box, //https://mui.com/material-ui/react-box/#example
  Button, //https://mui.com/material-ui/react-button/
  Paper, //https://mui.com/material-ui/react-paper/#main-content
  styled, //https://mui.com/system/styled/
  Table, //https://mui.com/material-ui/react-table/
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField, //https://mui.com/material-ui/react-text-field/#main-content
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { onSnapshot, query, where } from "firebase/firestore";
import { collectionRef, getMedicalRecords } from "../firebase/firebase";
import { MedicalModel } from "../types/MedicalModel";
import { useForm } from "../hooks/useForm";
import { NoDataText, CircularProgressIndicator, RowContainer } from ".";
import Swal from "sweetalert2";

export const FullContainer = styled("div")(() => ({
  width: "100%",
}));

export const MedicalTable = () => {
  const { values, handleInputChange } = useForm({
    age: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [medicalList, setMedicalList] = useState<MedicalModel[]>([]);

  const { age } = values;

  const handleSearch = async () => {
    if (!age.match(/^[0-9]+$/)) {
      return Swal.fire("Upps", "Attention, insert digits only", "error");
    }
    setIsLoading(true);
    setMedicalList(
      await getMedicalRecords(
        query(collectionRef, where("age", ">=", parseInt(age ?? 0)))
      )
    );
    setIsLoading(false);
  };

  useEffect(() => {
    onSnapshot(collectionRef, (snapshot) => {
      setMedicalList(
        snapshot.docs.map(
          (doc) =>
            ({
              id: doc.id,
              ...doc.data(),
            } as MedicalModel)
        )
      );
    });
  }, []);

  return (
    <FullContainer>
      <RowContainer style={{ margin: 0 }}>
        <TextField
          fullWidth
          label="Search by minimum age"
          value={age}
          variant="filled"
          onChange={({ target }: ChangeEvent<HTMLInputElement>) =>
            handleInputChange(target.value, "age")
          }
        />
        <Box sx={{ height: 10 }} />
        <Button
          variant="contained"
          endIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          {" "}
          Search{" "}
        </Button>
      </RowContainer>
      <Box sx={{ height: 15 }} />
      {isLoading ? (
        <CircularProgressIndicator />
      ) : medicalList.length === 0 ? (
        <NoDataText />
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 4 }}>
          <Table sx={{ minWidth: "50%" }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Doctor's name</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Genre</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicalList.map((row) => (
                <TableRow
                  hover
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.doctorName}
                  </TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.age ?? "N/D"}</TableCell>
                  <TableCell>{row.sex ?? "N/D"}</TableCell>
                  <TableCell>{row.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </FullContainer>
  );
};
