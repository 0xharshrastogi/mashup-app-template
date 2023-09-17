import type { IQdtListHandler, QdtConfig } from '@/types';

const LOCAL_STORAGE_LIST_KEY_NAME = 'qdt-config-list';
const LOCAL_STORAGE_ACTIVE_CONFIG_KEY_NAME = 'qdt-active-config';

export class LocalStorageQdtListHandler implements IQdtListHandler {
	getList(): Promise<QdtConfig[]> {
		const text = localStorage.getItem(LOCAL_STORAGE_LIST_KEY_NAME);
		if (!text) {
			return Promise.resolve([]);
		}
		const configs: QdtConfig[] = JSON.parse(text);
		return Promise.resolve(configs);
	}

	async insertConfig(config: QdtConfig): Promise<void> {
		const configs = await this.getList();
		const index = configs.findIndex(({ name }) => config.name === name);

		if (index !== -1) {
			throw new Error('duplicate config name or app id provided');
		}

		configs.push(config);
		localStorage.setItem(LOCAL_STORAGE_LIST_KEY_NAME, JSON.stringify(configs));
	}

	async getActiveConfig(): Promise<QdtConfig | null> {
		const text = localStorage.getItem(LOCAL_STORAGE_ACTIVE_CONFIG_KEY_NAME);
		if (!text) return null;
		return Promise.resolve(JSON.parse(text));
	}

	async setActiveConfig(config: QdtConfig): Promise<void> {
		const text = JSON.stringify(config);
		localStorage.setItem(LOCAL_STORAGE_ACTIVE_CONFIG_KEY_NAME, text);
	}
}
