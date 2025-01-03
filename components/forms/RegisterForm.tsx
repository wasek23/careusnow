'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Form, FormControl } from '@/components/ui/form';
import FileUploader from '../FileUploader';
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { PatientFormValidation } from '@/lib/validation';
import { registerPatient } from '@/lib/actions/patient.actions';
import { FormFieldType } from './PatientForm';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Doctors, GenderOptions, IdentificationTypes, PatientFormDefaultValues } from '@/constants';
import { Label } from '../ui/label';
import { SelectItem } from '../ui/select';
import Image from 'next/image';


const RegisterForm = ({ user }: { user: User }) => {

	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof PatientFormValidation>>({
		resolver: zodResolver(PatientFormValidation),
		defaultValues: {
			...PatientFormDefaultValues,
			name: '',
			email: '',
			phone: ''
		},
	})

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
		setIsLoading(true);

		let formData;

		const idDoc = values.identificationDocument;
		if (idDoc && idDoc.length > 0) {
			const blobFile = new Blob([idDoc[0]], { type: idDoc[0].type });

			formData = new FormData();
			formData.append('blobFile', blobFile);
			formData.append('fileName', idDoc[0].name);
		}

		try {
			const patientData = {
				...values,
				userId: user.$id,
				birthDate: new Date(values.birthDate),
				identificationDocument: formData
			}

			const patient = await registerPatient(patientData);

			if (patient) router.push(`/patients/${user.$id}/new-appointment`);
		} catch (error) {
			console.error(error);
		}
	}

	return <Form {...form}>
		<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12 flex-1">
			<section className='mb-12 space-y-4'>
				<h1 className='header'>Welcome 👋</h1>

				<p className='text-dark-700'>Let us know more about yourself.</p>
			</section>

			<section className='space-y-6'>
				<div className='mb-9 space-y-1'>
					<h2 className='sub-header'>Personal Information.</h2>
				</div>
			</section>

			<CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name='name' label='Full Name' placeholder='A Patient Name' iconSrc='/assets/icons/user.svg' iconAlt='user' />

			<div className='flex flex-col gap-6 xl:flex-row'>
				<CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name='email' label='Email' placeholder='name@email.com' iconSrc='/assets/icons/email.svg' iconAlt='email' />

				<CustomFormField control={form.control} fieldType={FormFieldType.PHONE_INPUT} name='phone' label='Phone Number' placeholder='+8801XXXXXXXXX' />
			</div>

			<div className='flex flex-col gap-6 xl:flex-row'>
				<CustomFormField control={form.control} fieldType={FormFieldType.DATE_PICKER} name='birthDate' label='Date of Birth' />

				<CustomFormField control={form.control} fieldType={FormFieldType.SKELETON} name='gender' label='Gender' renderSkeleton={field => <>
					<FormControl>
						<RadioGroup className='flex h-11 gap-6 xl:justify-between' defaultValue={field.value} onValueChange={field.onChange}>
							{GenderOptions.map(option => <div key={option} className='radio-group'>
								<RadioGroupItem value={option} id={option} />

								<Label className='cursor-pointer' htmlFor={option}>{option}</Label>
							</div>)}
						</RadioGroup>
					</FormControl>
				</>} />
			</div>

			<div className='flex flex-col gap-6 xl:flex-row'>
				<CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name='address' label='Address' placeholder='14th Street, New York' />

				<CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name='occupation' label='Occupation' placeholder='Software Developer' />
			</div>

			<div className='flex flex-col gap-6 xl:flex-row'>
				<CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name='emergencyContactName' label='Emergency Contact Name' placeholder="Guardian' s name" />

				<CustomFormField control={form.control} fieldType={FormFieldType.PHONE_INPUT} name='emergencyContactNumber' label='Emergency Contact Number' placeholder='+8801XXXXXXXXX' />
			</div>


			<section className='space-y-6'>
				<div className='mb-9 space-y-1'>
					<h2 className='sub-header'>Medical Information</h2>
				</div>
			</section>

			<CustomFormField control={form.control} fieldType={FormFieldType.SELECT} name='primaryPhysician' label='Primary Physician' placeholder="Select a physician">
				{Doctors.map(doctor => <SelectItem key={doctor.name} value={doctor.name}>
					<div className='flex cursor-pointer items-center gap-2'>
						<Image className='rounded-full border border-dark500' src={doctor.image} alt={doctor.name} width={32} height={32} />

						<p>{doctor.name}</p>
					</div>
				</SelectItem>)}
			</CustomFormField>

			<div className='flex flex-col gap-6 xl:flex-row'>
				<CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name='insuranceProvider' label='Insurance Provider' placeholder='BlueCross BlueShield' />

				<CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name='insurancePolicyNumber' label='Insurance Policy Number' placeholder='ABC123456789' />
			</div>

			<div className='flex flex-col gap-6 xl:flex-row'>
				<CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name='allergies' label='Allergies' placeholder='Peanuts, Penicillin, Pollen' />

				<CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name='currentMedication' label='Current Medication' placeholder='Ibuprofen 200mg, Paracetamol 500mg' />
			</div>



			<div className='flex flex-col gap-6 xl:flex-row'>
				<CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name='familyMedicalHistory' label='Family Medical History' placeholder='None' />

				<CustomFormField control={form.control} fieldType={FormFieldType.TEXTAREA} name='pastMedicalHistory' label='Past Medical History' placeholder='None' />
			</div>


			<section className='space-y-6'>
				<div className='mb-9 space-y-1'>
					<h2 className='sub-header'>Identification and Verification</h2>
				</div>
			</section>

			<CustomFormField control={form.control} fieldType={FormFieldType.SELECT} name='identificationType' label='Identification Type' placeholder="Select identification type">
				{IdentificationTypes.map(type => <SelectItem key={type} value={type}>
					{type}
				</SelectItem>)}
			</CustomFormField>

			<CustomFormField control={form.control} fieldType={FormFieldType.INPUT} name='identificationNumber' label='Identification Number' placeholder='123456789' />

			<CustomFormField control={form.control} fieldType={FormFieldType.SKELETON} name='identificationDocument' label='Scanned Copy of Identification Document' renderSkeleton={field => <>
				<FormControl>
					<FileUploader files={field.value} onChange={field.onChange} />
				</FormControl>
			</>} />


			<section className='space-y-6'>
				<div className='mb-9 space-y-1'>
					<h2 className='sub-header'>Consent and Privacy</h2>
				</div>
			</section>

			<CustomFormField fieldType={FormFieldType.CHECKBOX} control={form.control} name='treatmentConsent' label='I consent to treatment' />

			<CustomFormField fieldType={FormFieldType.CHECKBOX} control={form.control} name='disclosureConsent' label='I consent to disclosure of information' />

			<CustomFormField fieldType={FormFieldType.CHECKBOX} control={form.control} name='privacyConsent' label='I consent to privacy policy' />


			<SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
		</form>
	</Form>
}
export default RegisterForm;