import { useRouter } from 'next/router'
import EditClient from '../../../components/views/client/EditClient';

const Handler  = () => {
  const router = useRouter();

  return <EditClient id={router.query.id} />
}

export default Handler