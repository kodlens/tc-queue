import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import { ReactNode } from "react";
// import StatusCards from "./partials/StatusCards";
import QueueStatusCards from "./partials/QueueStatusCards";
import QueueTable from "./partials/QueueTable";


export default function StaffDashboardIndex({ auth }: PageProps) {
  const fullName = `${auth.user.fname} ${auth.user.mname ?? ''} ${auth.user.lname}`.trim();

  return (
    <>
      <Head title="Dashboard" />

      <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome, {fullName}</p>
        </div>

        <QueueStatusCards />

        <QueueTable />

      </div>
    </>
  );
}

StaffDashboardIndex.layout = (page: ReactNode) => (
  <AuthenticatedLayout user={(page as any).props.auth.user}>
    {page}
  </AuthenticatedLayout>
);
