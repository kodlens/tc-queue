import { Head } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import QueueTableWithStatus from '@/Components/QueueTableWithStatus';

const ClaimedQueueIndex = () => {
  return (
    <>
      <Head title="Queue Claimed" />
      <QueueTableWithStatus status="claimed" />
    </>
  )
}

ClaimedQueueIndex.layout = (page:any) => <Authenticated user={page.props.auth.user}>{page}</Authenticated>
export default ClaimedQueueIndex
