import * as React from 'react';
import { useCallback } from 'react';
import useSWR from 'swr';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import styled from '@emotion/styled';
import { Container } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { useRouter } from 'next/router';
import PopConfirm from '../../PopConfirm';
import { toast } from 'react-toastify';
import { IconButton, Link, Stack } from '@mui/material';

export default function ListClient() {
  const { data = [], mutate } = useSWR('/api/client');
  const router = useRouter();
  const rows = Object(data.clients)

  const handleEdit = useCallback((clientId, e) => {
    e.preventDefault()
    router.push('/client/edit/' + clientId)
  }, [router])

  const deleteClient = useCallback(async (id: number) => {
    try {
      const response = await fetch('/api/client/' + id, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(id)
      })
      mutate()
      toast.success('Success')
      return response.json()
    } catch (err) {
      console.log(err)
    }
  }, [mutate])

  const columns = React.useMemo(
    () => [
      { field: 'name', headerName: 'Nimi', flex: 1 },
      {
        field: 'website',
        headerName: 'Lehekülg',
        flex: 1,
        renderCell: (params) => (
           <Link href={params.row.website} target="_blank" rel="noopener">{params.row.website}</Link>
         )
      },
      { field: 'companyRegNr', headerName: 'Registrikood', flex: 0.5 },
      { field: 'vatRegNr', headerName: 'KMkood', flex: 0.5 },
      {
        field: 'actions',
        headerName: 'Toimingud',
        flex: 0.4,
        sortable: false,
        renderCell: (params: any) => {
          return (
            <Stack direction="row" spacing={1}>
              <IconButton onClick={(e) => handleEdit(params.row.id, e)} size="large"><ModeEditOutlinedIcon /></IconButton>
              <PopConfirm
                message='Oled kindel, et soovid kustutada?'
                onConfirm={() => deleteClient(params.row.id)}
              >
                <IconButton size="large"><DeleteOutlineIcon /></IconButton>
              </PopConfirm>
            </Stack>
          );
        }
      }
    ],
    []
  );

  return (
    <Wrap>
      <Flex>
        <div style={{ width: '100%' }}>
          <DataGrid
            onCellClick={(params, event) => {
              event.defaultMuiPrevented = true;
            }}
            rows={rows}
            columns={columns}
            autoHeight={true}
            initialState={{
              pagination: {
                pageSize: 25,
              },
            }}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            checkboxSelection
            components={{ Toolbar: GridToolbar }}
            componentsProps={{
              toolbar: {
                showQuickFilter: true
              },
            }}
          />
        </div>
      </Flex>
    </Wrap>
  )
}

const Wrap = styled(Container)`
  background:white;
  min-height:100vh;
`
const Flex = styled.div`
  display:flex;
  gap:2rem;
  padding-block-start:2rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`