import { PageProps } from "@/types";
import { Head } from "@inertiajs/react";
import MyAccount from "../Auth/MyAccount";
import Authenticated from "@/Layouts/AuthenticatedLayout";

export default function StaffMyAccount({ auth }: PageProps) {

  return (

    <>
      <Head title="My Account"></Head>
      <MyAccount auth={auth} categories={[]} permissions={[]} statuses={[]}></MyAccount>
    </>
  )
}

StaffMyAccount.layout = (page: any) => <Authenticated user={page.props.auth.user}>{page}</Authenticated>
