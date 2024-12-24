import Image from 'next/image';
import { Button } from './ui/button';


interface ButtonProps {
	className: string | undefined,
	isLoading: boolean,
	children: React.ReactNode
}

const SubmitButton = ({ className, isLoading, children }: ButtonProps) => {
	return <Button className={className ?? 'shad-primary-btn w-full'} type='submit' disabled={isLoading}>
		{isLoading ? <div className='flex items-center gap-4'>
			<Image className='animate-spin' src='/assets/icons/loader.svg' alt='Loader' width={24} height={24} />
			Loading...
		</div> : children}
	</Button>
}
export default SubmitButton;