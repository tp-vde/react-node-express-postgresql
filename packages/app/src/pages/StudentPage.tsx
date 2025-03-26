import React, { useEffect, useState } from "react";
import TextField from '@mui/material/TextField';
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";
import { ApiClient } from "../api/ApiClient";
import { StudentRow } from "../api/types";
import { useForm, Controller } from "react-hook-form";
import { Content } from "../components/Root/Content";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { PageWithHeader } from "../components/CustomPages";

const initialFormData: StudentRow = {
  code: "",
  name: "",
  first_name: "",
  email: "",
  phone: "",
  speciality: "",
  entry_at: null,
  first_departure_mission_at: null,
};

const apiService = new ApiClient("http://localhost:7007");

function StudentPage() {
  const [formData, setFormData] = useState<StudentRow>(initialFormData);
  const [rows, setRows] = useState<StudentRow[]>([]);
  const [editMode, setEditMode] = useState(false);

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialFormData,
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await apiService.getStudentData();
      setRows(response);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.pushStudent(formData);
      fetchStudents();
      setFormData(initialFormData);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving registration:", error);
    }
  };

  const columns: GridColDef[] = [
    { field: "code", headerName: "Code", width: 130  },
    { field: "name", headerName: "Nom" , width: 130},
    { field: "first_name", headerName: "Prénom" , width: 130},
    { field: "email", headerName: "Email" , width: 200},
    { field: "phone", headerName: "Téléphone" , width: 130},
    { field: "speciality", headerName: "Spécialité" },
    {
      field: "entry_at",
      headerName: "Date d'entrée",
      valueGetter: (params) => {
        return params.row.entry_at
          ? dayjs(params.row.entry_at).format("YYYY-MM-DD")
          : "";
      },
    },
    {
      field: "first_departure_mission_at",
      headerName: "Date de mission",
      valueGetter: (params) => {
        return params.row.first_departure_mission_at
          ? dayjs(params.row.first_departure_mission_at).format("YYYY-MM-DD")
          : "";
      },
    },
  ];

  return (
    <PageWithHeader title='VDE' >
    <Content >
      <Grid container spacing={2}>
      <Grid size={3} spacing={1}>
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" component="h1" gutterBottom align="center">
          {editMode ? "Modifier l'inscription" : "Formulaire d'inscription"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={1}>
            <TextField
              size="small"
              required
              fullWidth
              label="Code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              variant="outlined"
              sx={{ height:''}}
            />
          <Controller
            name="name"
            control={control}
            rules={{
              required: 'Le nom est requis',
              minLength: {
                value: 2,
                message: 'Le nom doit contenir au moins 2 caractères',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                required
                fullWidth
                label="Nom"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            )}
          />
            <TextField
              size="small"
              required
              fullWidth
              label="Prénom"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              variant="outlined"
            />
            <Controller
              name="email"
              control={control}
              rules={{
                required: "L'email est requis",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Adresse email invalide",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  size="small"
                  required
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  value={formData.email}
                  onChange={handleChange}
                  variant="outlined"
                />
              )}
            />  
          </Stack>
        </Box>
      </Paper>
      </Grid>
      <Grid size={9} spacing={1}>
      <Paper elevation={3} sx={{ p:2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Liste des étudiants
        </Typography>
        <Box sx={{ minHeight: 320, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.code}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 },
              },
            }}
          />
        </Box>
      </Paper>
      </Grid>
      </Grid>
   </Content>
   </PageWithHeader>
  );
}

export default StudentPage;
