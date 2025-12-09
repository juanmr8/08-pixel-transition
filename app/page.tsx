import { Link as TransitionLink } from 'next-transition-router';
import Button from '@/components/button';

export default function Page() {
	return (
		<div>
			{/** Top section split in two  */}
			<div className='grid max-h-screen grid-cols-2 overflow-hidden'>
				{/* Left column */}
				<LeftColumn />
				{/* Right column */}
				<div className='relative h-[calc(100svh-48px)]'>
					<img
						src='/e08/side-pan-bg.jpg'
						alt='Phone'
						className='absolute inset-0 -z-10 h-full w-full object-cover'
					/>

					{/* Centered image */}
					<div className='absolute inset-0 flex items-center justify-center'>
						<div className='relative flex h-full w-[40%] items-center justify-center'>
							<img src='/e08/side-pan-img.jpg' className='' />

							{/* Left text */}
							<p className='text-background font-display absolute top-[50%] right-[calc(100%+25px)] -translate-y-[50%] whitespace-nowrap'>
								GET CANDID PHOTOS
							</p>

							{/* Right text */}
							<p className='text-background font-display absolute top-[50%] left-[calc(100%+25px)] -translate-y-[50%] whitespace-nowrap'>
								AND BE IN THEM
							</p>
						</div>
					</div>

					{/* Text overlay */}
					<div className='text-background font-display absolute inset-0 flex items-center justify-between px-8'></div>
				</div>
			</div>
		</div>
	);
}

const LeftColumn = () => {
	return (
		<>
			<div className='px-x-margin flex h-full flex-col justify-between gap-[16px]'>
				<div className='flex flex-col gap-[16px]'>
					<div>
						<h1 className='font-display max-w-[20ch] text-[80px] leading-[0.9] tracking-[-4%] uppercase'>
							Selfies <span className='text-dark-secondary'>are </span> lazy{' '}
							<br />
							<span className='text-dark-secondary'>You deserve </span>
							<br />
							real photos
						</h1>
					</div>
					<div>
						<p className='max-w-[50ch]'>
							Press start, then forget it exists" Body: "Choose how many shots
							you want and how long to run. Your phone handles the rest while
							you focus on what matters."
						</p>
						<div className='flex gap-[16px] pt-[16px]'>
							<Button
								as='link'
								href='/demo'
								icon={<img src='/e08/apple-icon.svg' alt='Arrow Right' />}
							>
								Download iOS
							</Button>
							<Button
								icon={<img src='/e08/android-icon.svg' alt='Arrow Right' />}
							>
								Download Android
							</Button>
						</div>
					</div>
				</div>
				<div>
					<p className='pb-x-margin max-w-[50ch]'>
						Press start, then forget it exists" Body: "Choose how many shots you
						want and how long to run. Your phone handles the rest while you
						focus on what matters."
					</p>
				</div>
			</div>
		</>
	);
};
