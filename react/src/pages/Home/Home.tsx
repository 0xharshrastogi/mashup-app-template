import './Home.css';

import { useContext, useMemo, useState } from 'react';

import { QdtContext } from '@/components/containers';
import { Page } from '@/components/layout';
import { QdtComponent } from '@/components/shared';
import { AppType } from '@/types/qlik';

export const Home = () => {
	const [objectId, setObjectId] = useState('');
	const { active } = useContext(QdtContext);
	const option = useMemo(() => {
		return objectId ? { id: objectId } : null;
	}, [objectId]);

	const isFormDisabled = active == null;

	const onObjectIdSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
		event.preventDefault();
		const form = event.target as HTMLFormElement;
		const input = form[0] as HTMLInputElement;
		setObjectId(input.value);
	};

	return (
		<Page className="p-6 flex flex-col">
			<header>
				{isFormDisabled ? (
					<>Can't render app please select config from navbar</>
				) : (
					<form className="" onSubmit={onObjectIdSubmit}>
						<div className="flex gap-3 items-center">
							<input
								type="text"
								className="input bg-gray-100 dark:bg-gray-700 flex-1 input-sm md:input-md active:bg-gray-200 hover:bg-gray-200 dark:hover:dark:bg-gray-700 transition-colors ease-in text-green-700 font-semibold placeholder:font-normal"
								disabled={isFormDisabled}
								placeholder={`Type here object id from application: ${active.name}`}
							/>

							<button
								type="submit"
								disabled={isFormDisabled}
								className="btn btn-sm md:btn-md bg-green-700 hover:bg-green-800 text-white"
							>
								Render
							</button>
						</div>
					</form>
				)}
			</header>

			<section className="grid md:grid-cols-[4fr,1.5fr] mt-10 h-full gap-7 flex-1">
				<div className="flex-1 p-2 rounded-md grid items-center bg-gray-100 dark:bg-gray-700">
					{isFormDisabled ? (
						<span className="text-center text-gray-500">
							Initializing Qlik Application
						</span>
					) : option ? (
						<QdtComponent type={AppType.Capability} options={option} />
					) : (
						<span className="text-center text-gray-500">
							No Object Id Provided
						</span>
					)}
				</div>
				<aside className="hidden md:grid bg-gray-100 dark:bg-gray-700 min-w-[300px] p-2 rounded-md h-full place-items-center">
					<span className="text-gray-500">Feature In Development</span>
				</aside>
			</section>
		</Page>
	);
};
