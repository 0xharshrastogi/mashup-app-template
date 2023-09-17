import type { FC } from 'react';
import { useContext, useState } from 'react';

import { Modal, type ModalProps } from '@/components/shared';
import type { QdtConfig } from '@/types';

import { QdtContext } from '../..';

interface IProps extends Omit<ModalProps, 'children'> {}

type TFormFieldChangeFn = <T extends keyof QdtConfig>(
	field: T,
	value: QdtConfig[T]
) => void;

const initialFormState: QdtConfig = {
	name: '',
	host: window.location.hostname,
	prefix: '/analytic',
	secure: false,
	appId: '',
	port: null
};

export const QdtModalForm: FC<IProps> = (props) => {
	const [formValue, setFormValue] = useState<QdtConfig>(initialFormState);
	const { onClose } = props;
	const { insertConfig } = useContext(QdtContext);

	const onFormSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
		event.preventDefault();
		await insertConfig({
			...formValue,
			name: formValue.name.trim(),
			host: formValue.host.trim(),
			prefix: formValue.prefix.trim(),
			appId: formValue.appId.trim()
		});
		onClose?.();
		setFormValue({ ...initialFormState });
	};

	const onFormFieldChange: TFormFieldChangeFn = (field, value) => {
		setFormValue({
			...formValue,
			[field]: typeof value === 'string' ? value.trim() : value
		});
	};

	return (
		<Modal {...props}>
			<div className="">
				<header className="font-semibold text-2xl mb-4 flex items-center justify-between">
					<span className="title">Create New Qdt Config</span>
					<button
						onClick={onClose}
						className="btn btn-square btn-circle btn-sm"
					>
						<i className="fa-solid fa-xmark"></i>
					</button>
				</header>

				<form
					className="space-y-4 mt-10"
					autoComplete="off"
					onSubmit={onFormSubmit}
				>
					<div className="form-body space-y-4">
						<div className="form-control">
							<label htmlFor="name">Name</label>
							<input
								type="text"
								name="name"
								id="name"
								required
								placeholder="Config Name"
								className="input input-bordered w-full"
								value={formValue.name}
								onChange={(e) =>
									onFormFieldChange('name', e.target.value)
								}
							/>
						</div>
						<div className="form-control">
							<label htmlFor="hostname" className="form-label">
								Hostname
							</label>
							<input
								type="text"
								name="hostname"
								id="hostname"
								required
								placeholder="Hostname"
								className="input input-bordered w-full"
								value={formValue.host}
								onChange={(e) =>
									onFormFieldChange('host', e.target.value)
								}
							/>
						</div>
						<div className="form-control">
							<label htmlFor="port" className="form-label">
								Hostname
							</label>
							<input
								type="number"
								name="port"
								id="port"
								required
								placeholder="port"
								className="input input-bordered w-full"
								value={formValue.port === null ? '' : formValue.port}
								onChange={(e) =>
									onFormFieldChange(
										'port',
										e.target.value === ''
											? null
											: parseInt(e.target.value)
									)
								}
							/>
						</div>
						<div className="form-control">
							<label htmlFor="prefix" className="form-label">
								Prefix
							</label>
							<input
								type="text"
								name="prefix"
								id="prefix"
								placeholder="Prefix"
								className="input input-bordered w-full"
								value={formValue.prefix}
								onChange={(e) =>
									onFormFieldChange('prefix', e.target.value)
								}
							/>
						</div>
						<div className="form-control">
							<label htmlFor="app" className="form-label">
								App
							</label>
							<input
								type="text"
								name="app"
								id="app"
								required
								placeholder="App Id"
								className="input input-bordered w-full"
								value={formValue.appId}
								onChange={(e) =>
									onFormFieldChange('appId', e.target.value)
								}
							/>
						</div>
						<div className="form-control flex-row gap-3">
							<label htmlFor="hostname" className="form-label">
								Secure
							</label>
							<input
								type="checkbox"
								name="secure"
								id="secure"
								className="checkbox checked:bg-green-700"
								checked={formValue.secure}
								onChange={(e) =>
									onFormFieldChange('secure', e.target.checked)
								}
							/>
						</div>
					</div>
					<div className="form-footer">
						<button
							type="submit"
							className="btn btn-block  btn-success bg-green-700 hover:bg-green-700 text-white"
						>
							Add
						</button>
					</div>
				</form>
			</div>
		</Modal>
	);
};
