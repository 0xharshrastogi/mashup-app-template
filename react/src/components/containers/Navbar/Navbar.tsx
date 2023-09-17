import { useState } from 'react';

import { Modals } from '../Modals/Modals';
import { QdtConfigurationList } from '../QdtConfigurationList/QdtConfigurationList';

export const Navbar = () => {
	const [isModalActive, setIsModalActive] = useState(false);

	return (
		<>
			<nav className="px-4 py-3 bg-white bg-opacity-5 backdrop:blur flex justify-between">
				<div className="inline-flex items-center">
					<a href="/">Daily</a>
				</div>
				<div>
					<ul className="inline-flex items-center gap-3">
						<li>
							<span
								className="tooltip tooltip-bottom"
								data-tip="Create App Config"
							>
								<button
									className="btn"
									onClick={() => setIsModalActive(true)}
								>
									<i className="fa-solid fa-plus"></i>
								</button>
							</span>
						</li>
						<li>
							<QdtConfigurationList />
						</li>
					</ul>
				</div>
			</nav>

			<Modals.QdtConfigForm
				active={isModalActive}
				onClose={() => setIsModalActive(false)}
			/>
		</>
	);
};
