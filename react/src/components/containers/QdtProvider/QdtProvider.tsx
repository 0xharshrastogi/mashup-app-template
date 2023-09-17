import { qdtCapabilityApp, qdtEnigma } from 'qdt-components';
import type { FC, ReactNode } from 'react';
import { createContext, useEffect, useState } from 'react';

import type { IQdtListHandler, QdtConfig } from '@/types';

interface IProps {
	qdt: IQdtListHandler;

	children?: ReactNode;
}

interface IQdtListActions {
	insertConfig(config: QdtConfig): Promise<void>;
	setActiveConfig(config: QdtConfig): Promise<void>;
}

interface TContext extends IQdtListActions {
	configs: QdtConfig[];
	qdt: IQdtListHandler;
	active: QdtConfig | null;
	qlik?: { capabilityPromise: Promise<unknown>; enginePromise: Promise<unknown> };
}

export const QdtContext = createContext<TContext>(undefined!);

export const QdtProvider: FC<IProps> = (props) => {
	const [configs, setConfigs] = useState<QdtConfig[]>([]);
	const [active, setActive] = useState<QdtConfig | null>(null);
	const [qlik, setQlik] = useState<TContext['qlik']>();
	const { qdt } = props;

	useEffect(() => {
		const initConfigs = async () => {
			try {
				const configs = await qdt.getList();
				setConfigs([
					{
						host: 'sense-demo.qlik.com',
						name: 'Demo App',
						appId: 'b23be62b-79d1-4761-b576-00ebc19acfb3',
						prefix: '',
						secure: false,
						port: null
					},
					...configs
				]);
			} catch (error) {
				console.error('failed to initialize configs');
			}
		};

		initConfigs();
	}, [qdt]);

	useEffect(() => {
		const initActiveConfig = async () => {
			try {
				const active = await qdt.getActiveConfig();
				setActive(active);
			} catch (error) {
				console.warn('failed to init active config');
			}
		};

		initActiveConfig();
	}, []);

	useEffect(() => {
		if (active == null) return;
		const initQDT = async () => {
			const qdtConfig = { ...active };
			setQlik({
				capabilityPromise: qdtCapabilityApp(qdtConfig),
				enginePromise: qdtEnigma(qdtConfig)
			});
		};
		console.log('Active Config', active);
		initQDT();
	}, [active]);

	const _pushConfig = (config: QdtConfig) => {
		setConfigs([...configs, config]);
	};

	const handler: IQdtListActions = {
		async insertConfig(config: QdtConfig) {
			try {
				await qdt.insertConfig(config);
				_pushConfig(config);
			} catch (error) {
				const err =
					error instanceof Error ? error : new Error('something went wrong');
				alert(err.message);
			}
		},

		async setActiveConfig(config: QdtConfig) {
			try {
				await qdt.setActiveConfig(config);
			} catch (err) {
				console.error(err);
			} finally {
				setActive(config);
			}
		}
	};

	const { children } = props;

	return (
		<QdtContext.Provider value={{ configs, qdt, active, qlik, ...handler }}>
			{children}
		</QdtContext.Provider>
	);
};
