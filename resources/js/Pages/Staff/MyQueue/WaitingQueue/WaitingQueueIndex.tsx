import { Head } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import QueueTableWithStatus from '@/Components/QueueTableWithStatus';
import { ReactElement, ReactNode } from 'react';

const WaitingQueueIndex = () => {
  return (
    <>
      <Head title="Queue Waiting" />
      <QueueTableWithStatus status="waiting" />
    </>
  )
}

export default WaitingQueueIndex


WaitingQueueIndex.layout = (page:ReactNode) => <Authenticated user={(page as ReactElement).props.auth.user}>{page}</Authenticated>
