import {useRouter} from 'next/router';
import EditService from '../../../components/views/service/EditService';

const Handler = () => {
  const router = useRouter()

  return <EditService id={router.query.id} />
}

export default Handler