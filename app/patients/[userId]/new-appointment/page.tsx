import Image from 'next/image';

import AppointmentForm from '@/components/forms/AppointmentForm';
import { getPatient } from '@/lib/actions/patient.actions';

const NewAppointment = async ({ params }: SearchParamProps) => {
	const { userId } = await params;
	const patient = await getPatient(userId);

	return <div className='flex h-screen max-h-screen'>
		<section className='remove-scrollbar container my-auto'>
			<div className='sub-container max-w-[860px] flex-1 justify-between'>
				<Image className='mb-12 h-10 w-fit' src='/assets/icons/logo-full.svg' width={1000} height={1000} alt='Patient' />


				<AppointmentForm type='create' userId={userId} patientId={patient.$id} />


				<p className='copyright py-12 mt-10'>© 2024 CareUsNow</p>
			</div>
		</section>


		<Image className='side-img max-w-[390px] bg-bottom' src='/assets/images/appointment-img.png' width={1000} height={1000} alt='Appointment' />
	</div>
}
export default NewAppointment;