import './Page.css';

import type { FC, ReactNode } from 'react';

import { Navbar } from '../../containers';

interface IProps {
	className?: string;

	children?: ReactNode;
}

export const Page: FC<IProps> = (props) => {
	const { className, children } = props;

	return (
		<main className="main-container">
			<Navbar />
			<section className={className}>{children}</section>
		</main>
	);
};
