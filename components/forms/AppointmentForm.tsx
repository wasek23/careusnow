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
import { createUser } from '@/lib/actions/patient.actions';
import { FormFieldType } from './PatientForm';
import { Doctors } from '@/constants';
import { SelectItem } from '../ui/select';
import Image from 'next/image';

const AppointmentForm = ({ type, userId, patientId }: { type: 'create' | 'cancel' | 'schedule', userId: string, patientId: string }) => {
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
			const userData = { name, email, phone }

			const user = await createUser(userData);

			if (user) router.push(`/patients/${user.$id}/register`);
		} catch (error) {
			console.error(error);
		}
	}

	return <Form {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
			<section className='mb-12 space-y-4'>
				<h1 className='header'>New Appointment</h1>

				<p className='text-dark-700'>Request a nw appointment in 10 seconds!</p>
			</section>


			{'cancel' !== type ? <>
				<CustomFormField control={form.control} fieldType={FormFieldType.SELECT} name='primaryPhysician' label='Doctor' placeholder="Select a doctor">
					{Doctors.map(doctor => <SelectItem key={doctor.name} value={doctor.name}>
						<div className='flex cursor-pointer items-center gap-2'>
							<Image className='rounded-full border border-dark500' src={doctor.image} alt={doctor.name} width={32} height={32} />

							<p>{doctor.name}</p>
						</div>
					</SelectItem>)}
				</CustomFormField>


				<CustomFormField control={form.control} fieldType={FormFieldType.DATE_PICKER} name='schedule' label='Expected appointment date' showTimeSelect dateFormat='MM/dd/yyyy - h:mm aa' />


				<div className='flex flex-col gap-6 xl:flex-row'>
					<CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name='reason' label='Reason for appointment' placeholder='Enter reason for appointment' />

					<CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name='notes' label='Notes for appointment' placeholder='Enter notes for appointment' />
				</div>
			</> : <>
				<CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name='cancellationReason' label='Reason for cancellation' placeholder='Enter reason for cancellation' />
			</>}


			<SubmitButton isLoading={isLoading} className={`w-full ${'cancel' === type ? 'shad-danger-btn' : 'shad-primary-btn'}`}>{
				(() => {
					switch (type) {
						case 'cancel':
							return 'Cancel Appointment';
						case 'create':
							return 'Create Appointment';
						case 'schedule':
							return 'Schedule Appointment';
						default:
							return 'Book Appointment';
					}
				})()
			}</SubmitButton>
		</form>
	</Form>
}
export default AppointmentForm;