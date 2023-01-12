import { useRouter } from 'next/router'
import EditClient from '../../../components/views/client/EditClient';
import { Alert } from '@mui/material';

const Handler = () => {
  const router = useRouter();

  if (router.query.action === 'create') {
    return <EditClient id={null} />
  }

  return <Alert severity="error">{`Action '${router.query.action}' does not exist!`}</Alert>
}

export default Handler