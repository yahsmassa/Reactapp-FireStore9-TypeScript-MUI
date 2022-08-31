import { Box, AppBar, Divider, Toolbar, Typography } from "@mui/material";
import { MedicalTable, MedicalForm, RowContainer } from "./components";

export const MainApp = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h5" sx={{ fontWeight: "bold" }}>
            Registros
          </Typography>
        </Toolbar>
      </AppBar>
      <Divider />
      <Box sx={{ my: 10 }}>
        <RowContainer>
          <MedicalTable />
          <MedicalForm />
        </RowContainer>
      </Box>
    </>
  );
};
