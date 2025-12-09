'use client';

import gsap from 'gsap';
import { TransitionRouter } from 'next-transition-router';
import { LenisProvider } from './lenis-provider';

const COLOR = ' #FF4B33';

export function Providers({ children }: { children: React.ReactNode }) {
	return (
		<LenisProvider>
			<TransitionFromTop>{children}</TransitionFromTop>
		</LenisProvider>
	);
}

export function TransitionRandom({ children }: { children: React.ReactNode }) {
	const columns = 22;
	const rows = 18;
	const delay = 0.001;

	// Helper function to shuffle array for random order
	const shuffleArray = (array: number[]) => {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	};

	return (
		<TransitionRouter
			leave={next => {
				const pixels = document.querySelectorAll('.pixel');
				// Create array of indices and shuffle for random order
				const indices = Array.from({ length: pixels.length }, (_, i) => i);
				const shuffledIndices = shuffleArray(indices);
				const tl = gsap.timeline();
				// Fade in each pixel with random stagger
				shuffledIndices.forEach((index, i) => {
					tl.to(
						pixels[index],
						{
							opacity: 1,
							duration: 0,
							ease: 'power2.inOut',
						},
						i * delay
					);
				});
				tl.call(() => {
					next();
				});
			}}
			enter={next => {
				const pixels = document.querySelectorAll('.pixel');
				const indices = Array.from({ length: pixels.length }, (_, i) => i);
				const shuffledIndices = shuffleArray(indices);
				const tl = gsap.timeline();

				// Fade out in random order
				shuffledIndices.forEach((index, i) => {
					tl.to(
						pixels[index],
						{
							opacity: 0,
							duration: 0,
							ease: 'power2.inOut',
						},
						i * delay
					);
				});

				tl.call(() => {
					next();
				});
			}}
		>
			<main>{children}</main>
			<div className='pointer-events-none fixed top-0 left-0 z-50 flex min-h-screen w-full overflow-hidden blend-multiply'>
				{Array.from({ length: columns }).map((_, col) => (
					<div
						key={col}
						className='overfllow-hidden flex flex-col'
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
	const columns = 18;
	const rows = 16;

	// Helper function to shuffle array for random order
	const shuffleArray = (array: number[]) => {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	};

	return (
		<TransitionRouter
			leave={next => {
				const pixels = document.querySelectorAll('.pixel');
				const tl = gsap.timeline();

				// Left-to-right with OVERLAPPING randomness
				Array.from({ length: columns }).forEach((_, col) => {
					// Shuffle rows for this column
					const rowIndices = shuffleArray(
						Array.from({ length: rows }, (_, i) => i)
					);

					rowIndices.forEach((row, shufflePosition) => {
						const pixelIndex = col * rows + row;
						// The key: shufflePosition can be 0-11, giving overlap between columns
						// Column 0: delays 0-11 × 0.02 = 0 to 0.22s
						// Column 1: delays 1-12 × 0.02 = 0.02 to 0.24s
						// They OVERLAP! Creating the scattered wave effect
						const delayValue = col + shufflePosition;

						tl.to(
							pixels[pixelIndex],
							{ opacity: 1, duration: 0 },
							delayValue * 0.03 // Single multiplier like the original
						);
					});
				});

				tl.call(() => next());
			}}
			enter={next => {
				const pixels = document.querySelectorAll('.pixel');
				const tl = gsap.timeline();

				// Right-to-left reverse
				Array.from({ length: columns }).forEach((_, col) => {
					const rowIndices = shuffleArray(
						Array.from({ length: rows }, (_, i) => i)
					);

					rowIndices.forEach((row, shufflePosition) => {
						const pixelIndex = col * rows + row;

						// Reverse: (totalColumns - col) + shufflePosition
						const delayValue = columns - col + shufflePosition;

						tl.to(
							pixels[pixelIndex],
							{ opacity: 0, duration: 0 },
							delayValue * 0.02
						);
					});
				});

				tl.call(() => next());
			}}
		>
			<main>{children}</main>
			<div className='pointer-events-none fixed top-0 left-0 z-50 flex min-h-screen w-full overflow-hidden blend-multiply'>
				{Array.from({ length: columns }).map((_, col) => (
					<div
						key={col}
						className='overfllow-hidden flex flex-col'
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

	// Helper function to shuffle array for random order
	const shuffleArray = (array: number[]) => {
		const shuffled = [...array];
		for (let i = shuffled.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
		}
		return shuffled;
	};

	return (
		<TransitionRouter
			leave={next => {
				const pixels = document.querySelectorAll('.pixel');
				const tl = gsap.timeline();

				// Top-to-bottom with OVERLAPPING randomness
				Array.from({ length: rows }).forEach((_, row) => {
					// Shuffle columns for this row
					const colIndices = shuffleArray(
						Array.from({ length: columns }, (_, i) => i)
					);

					colIndices.forEach((col, shufflePosition) => {
						// Calculate pixel index: col * rows + row
						const pixelIndex = col * rows + row;

						// Row drives direction (top to bottom)
						// shufflePosition adds scatter across the row
						const delayValue = row + shufflePosition;

						tl.to(
							pixels[pixelIndex],
							{ opacity: 1, duration: 0 },
							delayValue * 0.02
						);
					});
				});

				tl.call(() => next());
			}}
			enter={next => {
				const pixels = document.querySelectorAll('.pixel');
				const tl = gsap.timeline();

				// Bottom-to-top reverse
				Array.from({ length: rows }).forEach((_, row) => {
					const colIndices = shuffleArray(
						Array.from({ length: columns }, (_, i) => i)
					);

					colIndices.forEach((col, shufflePosition) => {
						const pixelIndex = col * rows + row;

						// Reverse: start from bottom
						const delayValue = rows - row + shufflePosition;

						tl.to(
							pixels[pixelIndex],
							{ opacity: 0, duration: 0 },
							delayValue * 0.02
						);
					});
				});

				tl.call(() => next());
			}}
		>
			<main>{children}</main>
			<div className='pointer-events-none fixed top-0 left-0 z-50 flex min-h-screen w-full overflow-hidden'>
				{Array.from({ length: columns }).map((_, col) => (
					<div
						key={col}
						className='overfllow-hidden flex flex-col'
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
