import { Head } from '@inertiajs/react';
import QueueTable from '../Dashboard/partials/QueueTable'
import Authenticated from "@/Layouts/AuthenticatedLayout";

const StaffMyQueueIndex = () => {
  return (
    <>
      <Head title="My Queue" />
      <QueueTable />
    </>
  )
}

StaffMyQueueIndex.layout = (page:any) => <Authenticated user={page.props.auth.user}>{page}</Authenticated>
export default StaffMyQueueIndex
