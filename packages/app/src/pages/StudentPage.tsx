import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { ApiClient } from '../api/ApiClient';
import { extendTheme, styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';

interface Student {
  code: string;
  name: string;
  first_name: string;
  email: string;
  phone: string;
  speciality: string;
  entry_at: string;
  first_departure_mission_at?: string | null;
  created_at?: string;
};


const apiService = new ApiClient("http://localhost:7007");

export default function StudentPage() {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await apiService.getStudentData();
      setStudents(response as Student[]);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const columns: GridColDef[] = [
    { field: 'code', headerName: 'Code', width: 100 },
    { field: 'name', headerName: 'Name', width: 130 },
    { field: 'first_name', headerName: 'First Name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 130 },
    { field: 'speciality', headerName: 'Speciality', width: 130 },
    {
      field: 'entry_at',
      headerName: 'Entry Date',
      width: 130,
      valueGetter: (params) => dayjs(params.row.entry_at).format('YYYY-MM-DD')
    },
    {
      field: 'first_departure_mission_at',
      headerName: 'First Departure Date',
      width: 130,
      valueGetter: (params) => params.row.first_departure_mission_at ? dayjs(params.row.first_departure_mission_at).format('YYYY-MM-DD') : ''
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ bgcolor: 'green'}}>
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
    <Typography variant="h4" component="h1" gutterBottom>
          Liste des étudiants de VDE
        </Typography>
            <Grid container spacing={1}>
      
              <Grid size={12} sx={{ }}>
      
          <DataGrid
            rows={students}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            getRowId={(students) => students.code}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 }
              }
            }}
          />
     
              </Grid>
            </Grid>
            </Paper> 
      {/* <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Liste des étudiants de VDE
        </Typography>
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={students}
            columns={columns}
            pageSizeOptions={[5, 10, 25]}
            getRowId={(students) => students.code}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 5 }
              }
            }}
          />
        </div>
      </Paper> */}
    </Container>
  );
}