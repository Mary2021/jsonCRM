import useSWR from 'swr';
import { DataGrid } from '@mui/x-data-grid';
import styled from '@emotion/styled';
import { Container } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ModeEditOutlinedIcon from '@mui/icons-material/ModeEditOutlined';
import { useRouter } from 'next/router';
import PopConfirm from '../../PopConfirm';
import { toast } from 'react-toastify';
import { IconButton, Stack } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function ListService() {
  const { data = [], mutate } = useSWR('/api/service');
  const router = useRouter();
  const rows = Object(data.services)
  //Object(data.services)

  const handleEdit = (serviceId: number, e) => {
    e.preventDefault()
    router.push('/service/edit/' + serviceId) ///service/[action]/[id]
  }

  async function deleteService(id: number) {
    try {
      const response = await fetch('/api/service/' + id, {
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
  }

  const columns = [
    { field: 'id', headerName: 'id', flex: 0.1 },
    { field: 'name', headerName: 'Nimi', flex: 0.5 },
    { field: 'tags', headerName: 'tags', flex: 0.5 },
    {
      field: 'action',
      headerName: 'Toimingud',
      flex: 0.9,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <Stack direction="row" spacing={1}>
            <IconButton
              href={params.row.liveUrl}
              disabled={!params.row.liveUrl}
              target="_blank"
              rel="noopener"
              size="large"><LaunchIcon /></IconButton>
            <IconButton
              href={params.row.repositoryUrl}
              disabled={!params.row.repositoryUrl}
              target="_blank"
              rel="noopener"
              size="large"><GitHubIcon /></IconButton>
            <IconButton onClick={(e) => handleEdit(params.row.id, e)} size="large"><ModeEditOutlinedIcon /></IconButton>
            <PopConfirm
              message='Oled kindel, et soovid kustutada?'
              onConfirm={() => deleteService(params.row.id)}
            >
              <IconButton size="large"><DeleteOutlineIcon /></IconButton>
            </PopConfirm>
          </Stack>
        );
      }
    }
  ];
  console.log(data)
  console.log(rows)

  return (
    <Wrap>
      <Flex>
        <div style={{ width: '100%' }}>
          <DataGrid
            onCellClick={(params, event) => {
              event.defaultMuiPrevented = true;
            }}
            rows={rows}
            getRowId={data.serviceId}
            columns={columns}
            autoHeight={true}
            initialState={{
              pagination: {
                pageSize: 25,
              },
            }}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            checkboxSelection
          />
        </div>
      </Flex>
    </Wrap>
  )
}

const Wrap = styled(Container)`
  background:white;
  min-height:100vh;
  padding-block-start:5rem;
`
const Flex = styled.div`
  display:flex;
  gap:2rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`