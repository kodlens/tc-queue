import { Head } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import QueueTableWithStatus from '@/Components/QueueTableWithStatus';
import { ReactElement, ReactNode } from 'react';

const ProcessingQueueIndex = () => {
  return (
    <>
      <Head title="Queue Processing" />
      <QueueTableWithStatus status="processing" />
    </>
  )
}

export default ProcessingQueueIndex

ProcessingQueueIndex.layout = (page:ReactNode) => <Authenticated
  user={(page as ReactElement).props.auth.user}>
    {page}
  </Authenticated>

