import { Head } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import QueueTableWithStatus from '@/Components/QueueTableWithStatus';

const WaitingQueueIndex = () => {
  return (
    <>
      <Head title="Queue Waiting" />
      <QueueTableWithStatus status="waiting" />
    </>
  )
}

WaitingQueueIndex.layout = (page:any) => <Authenticated user={page.props.auth.user}>{page}</Authenticated>
export default WaitingQueueIndex
