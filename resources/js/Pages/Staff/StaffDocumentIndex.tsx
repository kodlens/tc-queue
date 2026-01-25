import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { ReactNode } from 'react'

const StaffDocumentIndex = () => {
  return (
    <div>StaffDocumentIndex</div>
  )
}


StaffDocumentIndex.layout = (page: ReactNode) => (
  <AuthenticatedLayout user={(page as any).props.auth.user}>
    {page}
  </AuthenticatedLayout>
);
export default StaffDocumentIndex
