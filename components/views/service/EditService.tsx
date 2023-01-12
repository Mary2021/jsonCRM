import { useRouter } from 'next/router'
import { TextField, Card, Container, Fab, InputLabel, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import CancelIcon from '@mui/icons-material/Cancel';
import useSWR from 'swr';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { Portal } from 'react-portal';

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

const defaultService = {
  name: '',
  tags: '',
  description: '',
  liveUrl: '',
  repositoryUrl: ''
}

const EditService = ({ id }: { id: any }) => {
  const { data: service = defaultService, error, mutate } = useSWR(id ? '/api/service/' + id : null);
  const [formData, setFormData] = useState({ ...service });
  const router = useRouter();

  useEffect(() => {
    setFormData(service)
  }, [service])

  const refreshData = () => {
    router.replace(router.asPath);
  }
  const redirect = (id) => {
    router.replace('/service/edit/' + id);
  }

  //get the action to text
  let action = id ? 'Edit' : 'Create'

  const saveService = async (e: any) => {
    e.preventDefault()
    try {
      if (!service.id) {
        const response = await fetch('/api/service', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        })
        mutate()
        if (response.status < 300) {
          toast.success('Success')
          refreshData()
        }
        response.json().then(data => redirect(data.id))
      }

      else {
        const response = await fetch('/api/service/' + id, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        mutate()
        if (response.status < 300) {
          toast.success('Success')
          refreshData()
        }
        return response.json()
      }
    } catch (err) {
      console.log(err)
    }
    console.log(formData, 'url')
  }
  console.log(service)

  return (
    <Wrap>
      <div>
        <Header>
          <Fab size="small" color="secondary" title="Cancel edit" onClick={() => router.back()}><CancelIcon /></Fab>
          <h1>{action} service <ClientName>{service.name}</ClientName></h1>
        </Header>
        <Block>
          {formData && <>
            <TextField value={formData.name} label="Name" variant="outlined" onChange={e => setFormData({ ...formData, name: e.target.value })} />
            <InputLabel style={{ margin: "0.5rem 0" }}>Description</InputLabel>
            <MDEditor value={formData.description} onChange={(newValue = "") => setFormData({ ...formData, description: newValue })} />
            <TextField value={formData.tags} label="Tags" variant="outlined" onChange={e => setFormData({ ...formData, tags: e.target.value })} />
            <TextField value={formData.liveUrl} label="LiveUrl" variant="outlined" onChange={e => setFormData({ ...formData, liveUrl: e.target.value })} />
            <TextField value={formData.repositoryUrl} label="RepositoryUrl" variant="outlined" onChange={e => setFormData({ ...formData, repositoryUrl: e.target.value })} />
          </>
          }
          <Portal node={typeof window !== 'undefined' && document.getElementById("btnContainer")}>
            <Button variant="contained" color="primary" onClick={saveService}>Save</Button>
          </Portal>
        </Block>
      </div>
    </Wrap>
  );
}

export default EditService
const Header = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  button{
    margin-inline-end:1rem;
  }
`
const ClientName = styled.span`
    color:hotpink;
`
const Block = styled(Card)`
  padding:1rem;
  display:flex;
  flex-direction:column;
  margin:1rem ;
  justify-content:space-between;
  >div{
      margin-block-end:1rem;
  }
  button{
    margin:2rem 0 1rem 0;
  }
`
const Wrap = styled(Container)`
  background:white;
  >div {
    max-width: 80ch;
    width: 100%;
    margin:0 auto;
  }
`