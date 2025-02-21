import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { VdeApiClient } from '../api';
import { VdeData } from '../api/types';


const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 150,
    editable: true,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 300,
    valueGetter: (params: GridValueGetterParams) =>
      `${params.row.name } - ${params.row.email }`,
  },
];

const apiService = new VdeApiClient("http://localhost:7007");

const VdeDataDisplay = () => {
  const [data, setData] = useState<VdeData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await apiService.getUserData();
      setData(result);
    };
    fetchData();
  }, []);

  return (
    <Box sx={{ height: 400, width: "90%", mt: 2, ml: 5 }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
};

export default VdeDataDisplay;