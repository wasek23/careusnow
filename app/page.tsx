import Image from 'next/image';
import Link from 'next/link';

import PatientForm from '@/components/forms/PatientForm';

export default function Home() {
	return <div className='flex h-screen max-h-screen'>
		{/* TODO OTP Verification || Passkey modal */}


		<section className='remove-scrollbar container my-auto'>
			<div className='sub-container max-w-[496px]'>
				<Image className='mb-12 h-10 w-fit' src='/assets/icons/logo-full.svg' width={1000} height={1000} alt='Patient' />


				<PatientForm />


				<div className='text-14-regular mt-20 flex justify-between'>
					<p className='justify-items-end text-dark-600 xl-text-left'>© 2024 CareUsNow</p>

					<Link className='text-green-500' href='/?admin=true'>Admin</Link>
				</div>
			</div>
		</section>


		<Image className='side-img max-w-[50%]' src='/assets/images/onboarding-img.png' width={1000} height={1000} alt='Patient' />
	</div>
}
