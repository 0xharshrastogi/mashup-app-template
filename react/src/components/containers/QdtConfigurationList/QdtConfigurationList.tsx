import { useContext } from 'react';

import { QdtContext } from '..';

export const QdtConfigurationList = () => {
	const { configs, active, setActiveConfig } = useContext(QdtContext);

	const onSelectHandler = (value: string) => {
		const config = configs.find((config) => config.name === value);

		if (!config) {
			console.error("config wasn't present in global state");
			return;
		}

		if (active && config.appId === active.appId) return;
		setActiveConfig(config);
	};

	return (
		<div className="dropdown dropdown-end">
			<label tabIndex={0} className="btn btn-ghost rounded-btn items-center">
				<span>{active ? active.name : 'Select Qdt Config'}</span>
				<span>
					<i className="fa-solid fa-caret-down"></i>
				</span>
			</label>
			<ul
				tabIndex={0}
				className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
			>
				{configs.length === 0 && <li>No App Created</li>}
				{configs.map((config) => (
					<li key={config.appId} onClick={() => onSelectHandler(config.name)}>
						<button>{config.name}</button>
					</li>
				))}
			</ul>
		</div>
	);
};
