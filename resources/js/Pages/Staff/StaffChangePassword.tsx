import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

import ChangePassword from "../Auth/ChangePassword";

export default function StaffChangePassword( ) {

    return (

        <>
            <Head title="Change Password"></Head>
            <Head title="My Account"></Head>
            <ChangePassword></ChangePassword>
        </>
    )
}

StaffChangePassword.layout = (page:any) => <Authenticated user={page.props.auth.user}>{page}</Authenticated>
