import { FunctionComponent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal');

export const ModalPortal: FunctionComponent = ({ children }) => {
	const el = useRef(document.createElement('div'));

	useEffect((): any => {
		if (!modalRoot) return;
		const temp = el.current;
		modalRoot.appendChild(temp);

		return () => modalRoot.removeChild(temp);
	}, []);
	return createPortal(<>{children}</>, el.current);
};
