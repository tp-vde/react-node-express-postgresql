import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import { ApiClient } from "../api/ApiClient";
import { StudentRow } from "../api/types";
import { useForm, Controller } from "react-hook-form";


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

function AdminPage() {
  const [formData, setFormData] = useState<StudentRow>(initialFormData);
  const [rows, setRows] = useState<StudentRow[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const {
    control,
    formState: { errors },
  } = useForm({
    defaultValues: initialFormData,
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await apiService.getUserData();
      setRows(response);
    } catch (error) {
      console.error("Error fetching registrations:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDateEntyChange = (date: dayjs.Dayjs | null) => {
    setFormData((prevState) => ({
      ...prevState,
      entry_at: date ? date.toISOString() : null,
    }));
  };

  const handleDateMissionChange = (date: dayjs.Dayjs | null) => {
    setFormData((prevState) => ({
      ...prevState,
      first_departure_mission_at: date ? date.toISOString() : null,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiService.pushUser(formData);
      fetchUsers();
      setFormData(initialFormData);
      setEditMode(false);
    } catch (error) {
      console.error("Error saving registration:", error);
    }
  };

  const handleEdit = (code: string) => {
    const rowToEdit = rows.find((row) => row.code === code);
    if (rowToEdit) {
      setFormData(rowToEdit);
      setSelectedId(code);
      setEditMode(true);
    }
  };

  const handleDelete = (code: string) => {
    setSelectedId(code);
    setOpenDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedId) {
      try {
        await apiService.deleteUser(selectedId);
        fetchUsers();
        setOpenDialog(false);
        setSelectedId(null);
      } catch (error) {
        console.error("Error deleting registration:", error);
      }
    }
  };
  const columns: GridColDef[] = [
    { field: "code", headerName: "Code", width: 100 },
    { field: "name", headerName: "Nom", width: 130 },
    { field: "first_name", headerName: "Prénom", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Téléphone", width: 130 },
    { field: "speciality", headerName: "Spécialité", width: 130 },
    {
      field: "entry_at",
      headerName: "Date d'entrée",
      width: 130,
      valueGetter: (params) => {
        return params.row.entry_at
          ? dayjs(params.row.entry_at).format("YYYY-MM-DD")
          : "";
      },
    },
    {
      field: "first_departure_mission_at",
      headerName: "Date de mission",
      width: 130,
      valueGetter: (params) => {
        return params.row.first_departure_mission_at
          ? dayjs(params.row.first_departure_mission_at).format("YYYY-MM-DD")
          : "";
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.row.code)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.code)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          {editMode ? "Modifier l'inscription" : "Formulaire d'inscription"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={3}>
            <TextField
              required
              fullWidth
              label="Code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              variant="outlined"
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
            <TextField
              required
              fullWidth
              label="Téléphone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
            />
            <TextField
              required
              fullWidth
              label="Spécialité"
              name="speciality"
              value={formData.speciality}
              onChange={handleChange}
              variant="outlined"
            />
            <DatePicker
              label="Date d'entrée"
              value={formData.entry_at ? dayjs(formData.entry_at) : null}
              onChange={handleDateEntyChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  required: true,
                },
              }}
            />
            <DatePicker
              label="Date début de mission"
              value={
                formData.first_departure_mission_at
                  ? dayjs(formData.first_departure_mission_at)
                  : null
              }
              onChange={handleDateMissionChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                  required: true,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{ mt: 2 }}
            >
              {editMode ? "Modifier" : "Enregistrer"}
            </Button>
          </Stack>
        </Box>
      </Paper>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Liste des étudiants
        </Typography>
        <Box sx={{ height: 400, width: "100%" }}>
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

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer cette inscription ?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Annuler</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminPage;
