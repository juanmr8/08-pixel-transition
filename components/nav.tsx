import { Link } from 'next-transition-router';
import React from 'react';

function NavMenu() {
	return (
		<div className='flex justify-between items-center px-x-margin py-[16px] h-[48px]'>
			<Link href='/'>
				<img src='/e08/logo.svg' alt='Logo' />
			</Link>
			<div className='flex gap-[16px]'>
				<Link href='/'>Home</Link>
				<Link href='/demo'>Demo</Link>
			</div>
		</div>
	);
}

export default NavMenu;
