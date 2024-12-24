import Image from 'next/image';

import RegisterForm from '@/components/forms/RegisterForm';
import { getUser } from '@/lib/actions/patient.actions';

const Register = async ({ params: { userId } }: SearchParamProps) => {
	const user = await getUser(userId);

	return <div className='flex h-screen max-h-screen'>
		<section className='remove-scrollbar container'>
			<div className='sub-container max-w-[860px] flex-1 flex-col py-10'>
				<Image className='mb-12 h-10 w-fit' src='/assets/icons/logo-full.svg' width={1000} height={1000} alt='Patient' />

				<RegisterForm user={user} />

				<p className='copyright py-12'>© 2024 CareUsNow</p>
			</div>
		</section>


		<Image className='side-img max-w-[390px]' src='/assets/images/register-img.png' width={1000} height={1000} alt='Patient' />
	</div>
}
export default Register;