import ProcessingTImePerService from '@/Components/Reports/ProcessingTImePerService'
import AdminLayout from '@/Layouts/AdminLayout'
import { Head } from '@inertiajs/react'


const AdminDashboard = ()  =>{
   // const fullName = `${auth.user.fname} ${auth.user.mname ?? ''} ${auth.user.lname}`.trim();
    return (
        <>

            <Head title="Dashboard"/>
            <div className="py-6 px-4 sm:px-6 lg:px-8 space-y-6">

                <div className="p-4 sm:p-6 lg:p-8 bg-white shadow rounded-lg">
                    <div className='font-bold mb-2'>PROCESSING TIME AVERAGE</div>
                    <ProcessingTImePerService />
                </div>
            </div>
        </>
    )
}

AdminDashboard.layout = (page:any) => <AdminLayout user={page.props.auth.user}>{page}</AdminLayout>

export default AdminDashboard;
