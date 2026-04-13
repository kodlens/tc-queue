import { Head } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import QueueTableWithStatus from '@/Components/QueueTableWithStatus';

const CompletedQueueIndex = () => {
  return (
    <>
      <Head title="Queue Completed" />
      <QueueTableWithStatus status="completed" />
    </>
  )
}

CompletedQueueIndex.layout = (page:any) => <Authenticated user={page.props.auth.user}>{page}</Authenticated>
export default CompletedQueueIndex
