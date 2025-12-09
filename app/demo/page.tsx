import React from 'react';
import { Link as TransitionLink } from 'next-transition-router';

function DemoPage() {
	return (
		<div className='px-x-margin'>
			<div>
				<h1 className='font-display max-w-[20ch] text-[80px] leading-[0.9] tracking-[-4%] uppercase'>
					<span className='text-dark-secondary'>
						Check out our <br />
						gallery of <br />{' '}
					</span>{' '}
					KNDID moments
				</h1>
			</div>
			<div className='flex justify-between py-[120px] items-center'>
				<div className='border-foreground/30 flex size-[140px] items-center justify-center rounded-full border'>
					<img src='/e08/arrow-left.svg' />
				</div>
				<img src='/e08/gallery.jpg' className="w-[568px]" />
				<div className='border-foreground/30 flex size-[140px] items-center justify-center rounded-full border'>
					<img src='/e08/arrow-right.svg' />
				</div>
			</div>
		</div>
	);
}

export default DemoPage;
