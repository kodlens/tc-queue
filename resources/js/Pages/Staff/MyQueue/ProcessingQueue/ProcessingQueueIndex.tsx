import { Head } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import QueueTableWithStatus from '@/Components/QueueTableWithStatus';

const ProcessingQueueIndex = () => {
  return (
    <>
      <Head title="Queue Processing" />
      <QueueTableWithStatus status="processing" />
    </>
  )
}

ProcessingQueueIndex.layout = (page:any) => <Authenticated user={page.props.auth.user}>{page}</Authenticated>
export default ProcessingQueueIndex
