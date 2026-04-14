import { Head } from '@inertiajs/react';
import Authenticated from "@/Layouts/AuthenticatedLayout";
import QueueTableWithStatus from '@/Components/QueueTableWithStatus';
import { ReactElement, ReactNode } from 'react';

const ClaimedQueueIndex = () => {
  return (
    <>
      <Head title="Queue Claimed" />
      <QueueTableWithStatus status="claimed" />
    </>
  )
}

export default ClaimedQueueIndex

ClaimedQueueIndex.layout = (page:ReactNode) => <Authenticated user={(page as ReactElement).props.auth.user}>{page}</Authenticated>
