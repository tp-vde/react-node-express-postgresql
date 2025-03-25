import React, { useEffect, useState } from "react";
import {
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { ApiClient } from "../api/ApiClient";
import { UserRow } from "../api/types";
import { useForm, Controller } from "react-hook-form";
import { Content } from "../components/app/Content";
import { PageWithHeader } from "../components/CustomPages";


const initialFormData: UserRow = {
  last_name: "",
  first_name: "",
  email: "",
  phone: "",
  role: "",
};

const apiService = new ApiClient("http://localhost:7007");
  
function UserPage() {
  const [formData, setFormData] = useState<UserRow>(initialFormData);
  const [rows, setRows] = useState<UserRow[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleChangeRole = (event: SelectChangeEvent) => {

    setFormData(() => ({
        ...formData,
        role: event.target.value,
      }));
  };
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

  const handleEdit = (id: string) => {
    const rowToEdit = rows.find((row) => row.id === id);
    if (rowToEdit) {
      setFormData(rowToEdit);
      setSelectedId(id);
      setEditMode(true);
    }
  };

  const handleDelete = (id: string) => {
    setSelectedId(id);
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
    { field: "last_name", headerName: "Nom", width: 130 },
    { field: "first_name", headerName: "Prénom", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Téléphone", width: 130 },
    { field: "role", headerName: "Role", width: 130 },
    {
      field: "actions",
      headerName: "Actions",
      width: 130,
      renderCell: (params: GridRenderCellParams) => (
        <Box>
          <IconButton onClick={() => handleEdit(params.row.id)}>
            <EditIcon color="primary" />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <PageWithHeader title='VDE : Users Management' >
     <Content>
      <Grid container spacing={2}>
      <Grid size={3} spacing={1}>
      <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" component="h1" gutterBottom align="center">
          {editMode ? "Modifier l'utilisateur" : "Formulaire d'utilisateur"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <Stack spacing={1}>
            <TextField
              size="small"
              required
              fullWidth
              label="Nom"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              variant="outlined"
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
            <TextField
              size="small"
              required
              fullWidth
              label="Téléphone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              variant="outlined"
            />
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <InputLabel id="demo-select-small-label">Role</InputLabel>
                <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={formData.role}
                    label="Role"
                    onChange={handleChangeRole}
                >
                    <MenuItem value="">
                    <em>None</em>
                    </MenuItem>
                    <MenuItem value='user'>user</MenuItem>
                    <MenuItem value='moderator' >moderator</MenuItem>
                    <MenuItem value='admin'>admin</MenuItem>
                </Select>
                </FormControl>
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
      </Grid>
      <Grid size={9} spacing={1}>
      <Paper elevation={3} sx={{ p:2 }}>
        <Typography variant="h6" component="h2" gutterBottom>
          Liste des utilisateurs
        </Typography>
        <Box sx={{ minHeight: 320, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            getRowId={(row) => row.id}
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
      </Grid>
      </Grid>
    </Content>
    </PageWithHeader>
  );
}

export default UserPage;
