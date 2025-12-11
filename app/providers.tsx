'use client';

import gsap from 'gsap';
import { TransitionRouter } from 'next-transition-router';
import { LenisProvider } from './lenis-provider';

const COLOR = ' #FF4B33';

// Helper function to shuffle array for random order
function shuffleArray<T>(array: T[]): T[] {
	const shuffled = [...array];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<LenisProvider>
			<TransitionFromLeft>{children}</TransitionFromLeft>
		</LenisProvider>
	);
}

export function TransitionRandom({ children }: { children: React.ReactNode }) {
	const columns = 29;
	const rows = 24;
	const delay = 0.001;

	// Helper function to animate pixels with random stagger
	const animatePixels = (opacity: number, next: () => void) => {
		const pixels = document.querySelectorAll('.pixel');
		const indices = Array.from({ length: pixels.length }, (_, i) => i);
		const shuffledIndices = shuffleArray(indices);
		const tl = gsap.timeline();

		shuffledIndices.forEach((index, i) => {
			tl.to(
				pixels[index],
				{
					opacity,
					duration: 0,
					ease: 'power2.inOut',
				},
				i * delay
			);
		});
		tl.call(() => {
			next();
		});
	};

	return (
		<TransitionRouter
			leave={next => animatePixels(1, next)}
			enter={next => animatePixels(0, next)}
		>
			<main>{children}</main>
			<div className='blend-multiply pointer-events-none fixed top-0 left-0 z-50 flex min-h-screen w-full overflow-hidden'>
				{Array.from({ length: columns }).map((_, col) => (
					<div
						key={col}
						className='flex flex-col overflow-hidden'
						style={{ width: `${100 / columns}vw` }}
					>
						{Array.from({ length: rows }).map((_, row) => (
							<div
								key={`${col}-${row}`}
								className='pixel border-red w-full opacity-0'
								style={{ height: `${100 / columns}vw`, backgroundColor: COLOR }}
							/>
						))}
					</div>
				))}
			</div>
		</TransitionRouter>
	);
}

export function TransitionFromLeft({
	children,
}: {
	children: React.ReactNode;
}) {
	const columns = 28;
	const rows = 24;
	const delay = 0.02;

	const animateLeftToRight = (next: () => void) => {
		const pixels = document.querySelectorAll('.pixel');
		const tl = gsap.timeline();

		Array.from({ length: columns }).forEach((_, col) => {

			const rowIndices = shuffleArray(
				Array.from({ length: rows }, (_, i) => i)
			);

			rowIndices.forEach((row, shufflePosition) => {
				const pixelIndex = col * rows + row;
				const delayValue = col + shufflePosition;

				tl.to(pixels[pixelIndex], { opacity: 1, duration: 0 }, delayValue * delay);
			});
		});

		tl.call(() => next());
	};

	const animateRightToLeft = (next: () => void) => {
		const pixels = document.querySelectorAll('.pixel');
		const tl = gsap.timeline();
		Array.from({ length: columns }).forEach((_, col) => {
			const rowIndices = shuffleArray(
				Array.from({ length: rows }, (_, i) => i)
			);

			rowIndices.forEach((row, shufflePosition) => {
				const pixelIndex = col * rows + row;
				const delayValue = columns - col + shufflePosition;

				tl.to(pixels[pixelIndex], { opacity: 0, duration: 0 }, delayValue * delay);
			});
		});
		tl.call(() => next());
	};

	return (
		<TransitionRouter
			leave={next => animateLeftToRight(next)}
			enter={next => animateRightToLeft(next)}
		>
			<main>{children}</main>
			<div className='blend-multiply pointer-events-none fixed top-0 left-0 z-50 flex min-h-screen w-full overflow-hidden'>
				{Array.from({ length: columns }).map((_, col) => (
					<div
						key={col}
						className='flex flex-col overflow-hidden'
						style={{ width: `${100 / columns}vw` }}
					>
						{Array.from({ length: rows }).map((_, row) => (
							<div
								key={`${col}-${row}`}
								className='pixel border-red w-full opacity-0'
								style={{ height: `${100 / columns}vw`, backgroundColor: COLOR }}
							/>
						))}
					</div>
				))}
			</div>
		</TransitionRouter>
	);
}

export function TransitionFromTop({ children }: { children: React.ReactNode }) {
	const columns = 30;
	const rows = 25;
	const delay = 0.02;

	const animateTopToBottom = (opacity: number, next: () => void) => {
		const pixels = document.querySelectorAll('.pixel');
		const tl = gsap.timeline();

		Array.from({ length: rows }).forEach((_, row) => {
			const colIndices = shuffleArray(
				Array.from({ length: columns }, (_, i) => i)
			);

			colIndices.forEach((col, shufflePosition) => {
				const pixelIndex = row * columns + col;
				const delayValue = row + shufflePosition;

				tl.to(pixels[pixelIndex], { opacity, duration: 0 }, delayValue * delay);
			});
		});
		tl.call(() => next());
	};

	const animateBottomToTop = (opacity: number, next: () => void) => {
		const pixels = document.querySelectorAll('.pixel');
		const tl = gsap.timeline();

		Array.from({ length: rows }).forEach((_, row) => {
			const colIndices = shuffleArray(
				Array.from({ length: columns }, (_, i) => i)
			);

			colIndices.forEach((col, shufflePosition) => {
				const pixelIndex = row * columns + col;

				const delayValue = rows - row + shufflePosition;

				tl.to(pixels[pixelIndex], { opacity, duration: 0 }, delayValue * delay);
			});
		});

		tl.call(() => next());
	};

	return (
		<TransitionRouter
			leave={next => animateTopToBottom(1, next)}
			enter={next => animateBottomToTop(0, next)}
		>
			<main>{children}</main>
			<div className='blend-multiply pointer-events-none fixed top-0 left-0 z-50 flex min-h-screen w-full overflow-hidden'>
				{Array.from({ length: columns }).map((_, col) => (
					<div
						key={col}
						className='flex flex-col overflow-hidden'
						style={{ width: `${100 / columns}vw` }}
					>
						{Array.from({ length: rows }).map((_, row) => (
							<div
								key={`${col}-${row}`}
								className='pixel border-red w-full opacity-0'
								style={{ height: `${100 / columns}vw`, backgroundColor: COLOR }}
							/>
						))}
					</div>
				))}
			</div>
		</TransitionRouter>
	);
}
