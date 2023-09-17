import { qdtCompose, QdtViz } from 'qdt-components';
import type { FC } from 'react';
import { useContext, useEffect, useRef } from 'react';

import { QdtContext } from '@/components/containers';
import { AppType } from '@/types/qlik';

interface IProps {
	type?: AppType;
	options?: object;
	component?: object | null;
	properties?: object;
}

export const QdtComponent: FC<IProps> = (props) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const { qlik } = useContext(QdtContext);

	const { type, options, component, properties } = props;

	useEffect(() => {
		console.log(qlik);
		if (!qlik) return;

		const initInstance = async () => {
			try {
				const { current: element } = elementRef;

				if (type === AppType.Capability) {
					const app = await qlik.capabilityPromise;
					console.log({ capability: app });
					QdtViz({ element, app, options });
					return;
				}

				const app = await qlik.enginePromise;
				console.log({ capability: app });

				qdtCompose({
					element,
					component,
					app: await qlik.enginePromise,
					properties,
					options
				});
			} catch (error) {
				console.error('failed to init app');
			}
		};

		initInstance();
	}, [qlik, type, options, properties]);

	return <div ref={elementRef}></div>;
};

QdtComponent.defaultProps = {
	component: null,
	properties: {},
	options: {},
	type: AppType.Engine
};
