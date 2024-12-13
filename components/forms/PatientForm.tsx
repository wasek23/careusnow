'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form } from '@/components/ui/form';
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { UserFormValidation } from '@/lib/validation';

export enum FormFieldType {
	INPUT = 'input',
	TEXTAREA = 'textarea',
	PHONE_INPUT = 'phoneInput',
	CHECKBOX = 'checkbox',
	DATE_PICKER = 'datePicker',
	SELECT = 'select',
	SKELETON = 'skeleton',
}

const PatientForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof UserFormValidation>>({
		resolver: zodResolver(UserFormValidation),
		defaultValues: {
			name: '',
			email: '',
			phone: ''
		},
	})

	// 2. Define a submit handler.
	async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
		setIsLoading(true);

		try {
			// const userData = { name, email, phone }

			// const user = await crateUser(userData);

			// if (user) {
			// 	router.push(`/patients/${user.$id}/register`);
			// }
		} catch (error) {
			console.error(error);
		}
	}

	return <Form {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
			<section className='mb-12 space-y-4'>
				<h1 className='header'>Hi there 👋</h1>

				<p className='text-dark-700'>Schedule your first appointment.</p>
			</section>


			<CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name='name' label='Full Name' placeholder='A Patient Name' iconSrc='/assets/icons/user.svg' iconAlt='user' />

			<CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name='email' label='Email' placeholder='name@email.com' iconSrc='/assets/icons/email.svg' iconAlt='email' />

			<CustomFormField control={form.control} fieldType={FormFieldType.PHONE_INPUT} name='phone' label='Phone Number' placeholder='+8801XXXXXXXXX' />


			<SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
		</form>
	</Form>
}
export default PatientForm;