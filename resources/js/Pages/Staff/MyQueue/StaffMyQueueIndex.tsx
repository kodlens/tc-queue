import QueueTable from '../Dashboard/partials/QueueTable'
import Authenticated from "@/Layouts/AuthenticatedLayout";

const StaffMyQueueIndex = () => {
  return (
    <>
      <QueueTable />
    </>
  )
}

StaffMyQueueIndex.layout = (page:any) => <Authenticated user={page.props.auth.user}>{page}</Authenticated>
