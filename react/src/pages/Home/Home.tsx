import './Home.css';

import { useContext, useState } from 'react';

import { QdtContext } from '@/components/containers';
import { Page } from '@/components/layout';

export const Home = () => {
	const [objectId, setObjectId] = useState('');
	const { active } = useContext(QdtContext);

	const isFormDisabled = active == null;

	return (
		<Page className="home-page">
			<h1 className="bg-slate-700 text-red-500">Hello World</h1>
			<header>
				{isFormDisabled ? (
					<>Can't render app please select config from navbar</>
				) : (
					<form className="form object-id-form">
						<div>
							<input
								type="text"
								className="form-input"
								disabled={isFormDisabled}
								placeholder="please enter object id"
								value={objectId}
								onChange={(e) => setObjectId(e.target.value)}
							/>

							<button disabled={isFormDisabled} className="btn">
								Render
							</button>
						</div>
					</form>
				)}
			</header>

			<section>
				{/* <QdtComponent type={AppType.Capability} properties={properties} /> */}
			</section>
		</Page>
	);
};
