export interface QdtConfig {
	name: string;
	host: string;
	secure: boolean;
	prefix: string;
	appId: string;
	port: number | null;
}

export interface IQdtListHandler {
	getList(): Promise<QdtConfig[]>;

	insertConfig(config: QdtConfig): Promise<void>;

	getActiveConfig(): Promise<QdtConfig | null>;

	setActiveConfig(config: QdtConfig): Promise<void>;
}

export enum AppType {
	Engine = 1,
	Capability = 2
}
