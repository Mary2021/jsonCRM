import { useRouter } from 'next/router'
import { Button, Card, Checkbox, Container, Fab, InputLabel, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from '@emotion/styled';
import CancelIcon from '@mui/icons-material/Cancel';
import useSWR from 'swr';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { Portal } from "react-portal";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
);

const defaultClient = {
  name: '',
  website: '',
  companyRegNr: '',
  vatRegNr: '',
  notes: '',
  contactAddress: ''
}

const EditClient = ({ id }: { id: any }) => {
  const { data: client = defaultClient, mutate } = useSWR(id ? '/api/client/' + id : null);
  const [formData, setFormData] = useState(client)
  const router = useRouter();

  useEffect(() => {
    setFormData(client)
  }, [client])

  const refreshData = () => {
    router.replace(router.asPath);
  }

  const redirect = (id) => {
    router.replace('/client/edit/' + id);
  }

  //get the action to text
  let action = id ? 'Edit' : 'Create'

  const saveClient = async (e: any) => {
    e.preventDefault()
    try {
      if (!client.id) {
        const response = await fetch('/api/client', {
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
        const response = await fetch('/api/client/' + id, {
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

  return (
    <Wrap>
      <div>
        <Header>
          <Fab size="small" color="secondary" title="Cancel edit" onClick={() => router.back()}><CancelIcon /></Fab>
          <h1>{action} client <ClientName>{client.name}</ClientName></h1>
        </Header>
        {formData && <>
          <Block>
            <TextField value={formData.name} label="Name" variant="outlined"
              onChange={e => setFormData({ ...formData, name: e.target.value })} />
            <TextField value={formData.website} label="Website" variant="outlined"
              onChange={e => setFormData({ ...formData, website: e.target.value })} />
            <TextField value={formData.companyRegNr} label="RegNr" variant="outlined"
              onChange={e => setFormData({ ...formData, companyRegNr: e.target.value })} />
            <TextField value={formData.vatRegNr} label="VAT" variant="outlined"
              onChange={e => setFormData({ ...formData, vatRegNr: e.target.value })} />
            <TextField value={formData.contactAddress} label="Address" variant="outlined"
              onChange={e => setFormData({ ...formData, contactAddress: e.target.value })} />
        <InputLabel style={{ margin: "0.5rem 0" }}>Notes</InputLabel> 
            <MDEditor value={formData.notes}
              onChange={(newValue = "") => setFormData({ ...formData, notes: newValue })} />
            <Portal node={typeof window !== 'undefined' && document.getElementById("btnContainer")}>
              <Button onClick={saveClient} variant="contained" color="primary">Save</Button>
            </Portal>
          </Block>
        </>
        }
      </div>
    </Wrap>
  );
}

export default EditClient;
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
    max-width: 900px;
    width: 100%;
    margin:0 auto;
  }
`