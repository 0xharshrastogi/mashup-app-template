// import './Modal.css';

import type { FC, ReactNode } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface IProps {
	children: ReactNode;

	active?: boolean;

	onClose?: () => void;
}

const MODAL_CONTAINER_ID = 'app-modal';

export const Modal: FC<IProps> = (props) => {
	const container = document.getElementById(MODAL_CONTAINER_ID);
	const { children, active, onClose } = props;

	if (!container) throw new Error('container element not found');

	useEffect(() => {
		return () => {
			container.innerHTML = '';
		};
	}, []);

	return createPortal(
		active ? (
			<div
				className="fixed inset-0 z-50 backdrop-blur-md bg-gray-500 bg-opacity-10 flex items-center justify-center overscroll-y-contain"
				onClick={onClose}
			>
				<div className="modal-box" onClick={(event) => event.stopPropagation()}>
					{children}
				</div>
			</div>
		) : null,
		container
	);
};

export type ModalProps = IProps;
