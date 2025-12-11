'use client';

import React from 'react';
import { Link, useTransitionState } from 'next-transition-router';

interface BaseButtonProps {
	children: React.ReactNode;
	icon: React.ReactNode;
	className?: string;
}

type ButtonAsButton = BaseButtonProps & {
	as?: 'button';
	type?: 'button' | 'submit' | 'reset';
	onClick?: () => void;
	disabled?: boolean;
};

type ButtonAsLink = BaseButtonProps & {
	as: 'link';
	href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

function Button(props: ButtonProps) {
	const { children, icon, className = '' } = props;
	const { stage } = useTransitionState();
	const isTransitioning = stage !== 'none';

	const baseClasses = `flex items-center gap-4 bg-foreground py-3 px-5 rounded-full text-background text-[14px] uppercase font-bold leading-none ${className}`;

	if (props.as === 'link') {
		return (
			<Link
				href={props.href}
				className={`${baseClasses} ${isTransitioning ? 'pointer-events-none opacity-50' : ''}`}
			>
				{icon}
				{children}
			</Link>
		);
	}

	return (
		<button
			type={props.type || 'button'}
			onClick={props.onClick}
			disabled={props.disabled || isTransitioning}
			className={baseClasses}
		>
			{icon}
			{children}
		</button>
	);
}

export default Button;
