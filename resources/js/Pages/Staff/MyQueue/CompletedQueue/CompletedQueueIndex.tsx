import { Head } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import QueueTableWithStatus from '@/Components/QueueTableWithStatus';
import { ReactElement, ReactNode } from 'react';

const CompletedQueueIndex = () => {
  return (
    <>
      <Head title="Queue Completed" />
      <QueueTableWithStatus status="completed" />
    </>
  )
}


export default CompletedQueueIndex

CompletedQueueIndex.layout = (page:ReactNode) => <Authenticated
  user={(page as ReactElement).props.auth.user}>
    {page}
  </Authenticated>
