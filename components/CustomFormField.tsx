'use client';

import { Control } from 'react-hook-form';
import Image from 'next/image';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { FormFieldType } from './forms/PatientForm';
import { Select, SelectContent, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';

interface CustomProps {
	control: Control<any>,
	fieldType: FormFieldType,
	name: string,
	label?: string,
	placeholder?: string,
	iconSrc?: string,
	iconAlt?: string,
	disabled?: boolean,
	dateFormat?: string,
	showTimeSelect?: boolean,
	children?: React.ReactNode,
	renderSkeleton?: (field: any) => React.ReactNode
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
	const { fieldType, name, label, placeholder, iconSrc, iconAlt, disabled, dateFormat, showTimeSelect, renderSkeleton, children } = props;

	switch (fieldType) {
		case FormFieldType.INPUT:
			return <div className='flex rounded-md border border-dark-500 bg-400'>
				{iconSrc && <Image className='ml-2 mr-2' src={iconSrc} alt={iconAlt || 'field icon'} width={24} height={24} />}

				<FormControl>
					<Input className='shad-input border-0' {...field} placeholder={placeholder} />
				</FormControl>
			</div>;

		case FormFieldType.TEXTAREA:
			return <FormControl>
				<Textarea className='shad-textarea' {...field} placeholder={placeholder} disabled={disabled} />
			</FormControl>;

		case FormFieldType.PHONE_INPUT:
			return <FormControl>
				<PhoneInput className='input-phone' value={field.value} onChange={field.onChange} placeholder={placeholder} defaultCountry='BD' countries={['BD']} addInternationalOption={false} withCountryCallingCode />
			</FormControl>

		case FormFieldType.DATE_PICKER:
			return <div className='flex rounded-md border border-dark-500 bg-dark-400'>
				<Image className='ml-2' src='/assets/icons/calendar.svg' alt='Calender' width={24} height={24} />

				<FormControl>
					<DatePicker selected={field.value} onChange={date => field.onChange(date)} dateFormat={dateFormat ?? 'MM/dd/yyyy'} showTimeSelect={showTimeSelect ?? false} timeInputLabel='Time:' wrapperClassName='date-picker' />
				</FormControl>
			</div>

		case FormFieldType.SELECT:
			return <FormControl>
				<Select onValueChange={field.onChange} defaultValue={field.value}>
					<FormControl>
						<SelectTrigger className='shad-select-trigger'>
							<SelectValue placeholder={placeholder} />
						</SelectTrigger>
					</FormControl>

					<SelectContent className='shad-select-content'>
						{children}
					</SelectContent>
				</Select>
			</FormControl>

		case FormFieldType.SKELETON:
			return renderSkeleton ? renderSkeleton(field) : null;

		case FormFieldType.CHECKBOX:
			return <FormControl>
				<div className='flex items-center gap-4'>
					<Checkbox id={name} checked={field.value} onCheckedChange={field.onChange} />

					<label className='checkbox-label' htmlFor={name}>{label}</label>
				</div>
			</FormControl>
		default:
			break;
	}
}

const CustomFormField = (props: CustomProps) => {
	const { control, fieldType, name, label } = props;

	return <FormField
		control={control}
		name={name}
		render={({ field }) => <FormItem className='flex-1'>
			{fieldType !== FormFieldType.CHECKBOX && label && <FormLabel>{label}</FormLabel>}

			<RenderField field={field} props={props} />

			<FormMessage className='shad-error' />
		</FormItem>}
	/>
}
export default CustomFormField;