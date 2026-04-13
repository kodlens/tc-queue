import { Head } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import QueueTableWithStatus from '@/Components/QueueTableWithStatus';

const StaffMyQueueIndex = () => {
  return (
    <>
      <Head title="Queue Pending" />
      <QueueTableWithStatus status="pending" />
    </>
  )
}

StaffMyQueueIndex.layout = (page:any) => <Authenticated user={page.props.auth.user}>{page}</Authenticated>
export default StaffMyQueueIndex
