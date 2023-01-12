import { useRouter } from 'next/router';
import EditService from '../../../components/views/service/EditService';
import {Alert} from "@mui/material";

const Handler = () => {
  const router = useRouter()

  if (router.query.action === 'create') {
    return <EditService id={null} />
  }

  return <Alert severity="error">{`Action '${router.query.action}' does not exist!`}</Alert>
}

export default Handler