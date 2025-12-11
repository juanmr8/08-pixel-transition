'use client';

import { Link, useTransitionState } from 'next-transition-router';

function NavMenu() {
	const { stage } = useTransitionState();
	const isTransitioning = stage !== 'none';

	return (
		<div className='px-x-margin flex h-[48px] items-center justify-between py-[16px]'>
			<Link href='/' className={isTransitioning ? 'pointer-events-none' : ''}>
				<img src='/e08/logo.svg' alt='Logo' />
			</Link>
			<div className='flex gap-[16px]'>
				<Link href='/' className={isTransitioning ? 'pointer-events-none' : ''}>
					Home
				</Link>
				<Link
					href='/demo'
					className={isTransitioning ? 'pointer-events-none' : ''}
				>
					Demo
				</Link>
			</div>
		</div>
	);
}

export default NavMenu;
