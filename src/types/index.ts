import { SemanticICONS } from 'semantic-ui-react';

import { HandleChangeFunc } from '../components/Util';
import { Entity, Player, ServerProperty, TileEntity, World } from '../fetch';
import { ApiState } from '../reducers/api';
import { CommandState } from '../reducers/command';
import { DashboardState } from '../reducers/dashboard';
import { DataViewState } from '../reducers/dataview';
import { PermissionState } from '../reducers/permission';
import { PluginState } from '../reducers/plugin';
import { PreferencesState } from '../reducers/preferences';
import { SettingsState } from '../reducers/server-settings';

// Lang
export enum Lang {
	EN = 'en',
	DE = 'de',
	FR = 'fr',
	RU = 'ru'
}
export interface LangEntry {
	text: string;
	value: Lang;
	flag: string;
}
export const langArray: LangEntry[] = [
	{
		text: 'English',
		value: Lang.EN,
		flag: 'us'
	},
	{
		text: 'Deutsch',
		value: Lang.DE,
		flag: 'de'
	},
	{
		text: 'Français',
		value: Lang.FR,
		flag: 'fr'
	},
	{
		text: 'русский',
		value: Lang.RU,
		flag: 'ru'
	}
];

// Reducers
export interface AppState {
	api: ApiState;
	dashboard: DashboardState;
	cmd: CommandState;
	entity: DataViewState<Entity>;
	permission: PermissionState;
	player: DataViewState<Player>;
	plugin: PluginState;
	world: DataViewState<World>;
	tileentity: DataViewState<TileEntity>;
	server_properties: SettingsState;
	preferences: PreferencesState;
}

// Data table
export type IdFunction<T> = (obj: T) => string;

export interface DataTableRef {
	state: any;
	setState: (changes: any) => void;
	handleChange: HandleChangeFunc;
	value?: string | string[];
}
export interface DataViewRef<T> extends DataTableRef {
	create: (data: any) => void;
	details: (data: T) => void;
	save: (data: T, newData: any) => void;
	edit: (data: T | undefined) => void;
	endEdit: () => void;
	delete: (data: T) => void;
}

export type DataFieldViewFunc<T> = (
	obj: T,
	view: DataTableRef
) => JSX.Element | string | undefined;
export type DataFieldEditFunc<T> = (
	obj: T,
	view: DataTableRef
) => JSX.Element | string | undefined;
export type DataFieldFilterFunc = (
	view: DataTableRef
) => JSX.Element | undefined;
export type DataFieldCreateFunc = (
	view: DataTableRef
) => JSX.Element | undefined;
export interface DataField<T> {
	label?: string;
	type?: string;
	view?: DataFieldViewFunc<T> | boolean;
	edit?: DataFieldEditFunc<T> | boolean;
	createName?: string;
	create?: DataFieldCreateFunc | boolean;
	filterName?: string;
	filter?: DataFieldFilterFunc | boolean;
	filterValue?: (val: T) => string;
	required?: boolean;
	isGroup?: boolean;
	options?: { value: string; text: string }[];
	wide?: boolean;
}

export interface DataFieldRaw<T> extends DataField<T> {
	name: string;
}

export interface DataFieldGroup<T> {
	first?: DataFieldRaw<T>;
	second?: DataFieldRaw<T>;
	only?: DataFieldRaw<T>;
}

// Views
export interface ViewDefinition {
	title: string;
	path: string;
	icon?: SemanticICONS;
	perms: string[][] | string[] | null;
	servlets?: string[][] | string[] | null;
	component?: React.ComponentType;
	views?: ViewDefinition[];
}

// Autosuggest
export interface AutosuggestItem {
	value: string;
	content: string;
}

export interface AutosuggestChangeData {
	id: string;
	name: string;
	value: string;
}

// Models
export interface Server {
	name: string;
	apiUrl: string;
	apiUrlHttps: string;
}

export interface EServerProperty extends ServerProperty {
	edit?: boolean;
	updating?: boolean;
}

export interface PermissionTree {
	[x: string]: boolean | string | PermissionTree;
}

// CatalogType keys
export enum CatalogTypeKeys {
	Block = 'block.BlockType',
	Difficulty = 'world.difficulty.Difficulty',
	Dimension = 'world.DimensionType',
	Entity = 'entity.EntityType',
	GameMode = 'entity.living.player.gamemode.GameMode',
	Generator = 'world.GeneratorType',
	Item = 'item.ItemType',
	TileEntity = 'block.tileentity.TileEntityType',
	Currency = 'service.economy.Currency'
}

export enum PreferenceKey {
	'lang' = 'lang',
	'theme' = 'theme',
	'showServerUsage' = 'showServerUsage',
	'hideWIPNote' = 'hideWIPNote',
	'hidePluginsNote' = 'hidePluginsNote',
	'hideServerSettingsNote' = 'hideServerSettingsNote'
}

export enum Theme {
	default = 'default',

	cerulean = 'cerulean',
	cosmo = 'cosmo',
	cyborg = 'cyborg',
	darkly = 'darkly',
	flatly = 'flatly',
	journal = 'journal',
	lumen = 'lumen',
	paper = 'paper',
	readable = 'readable',
	sandstone = 'sandstone',
	simplex = 'simplex',
	slate = 'slate',
	solar = 'solar',
	spacelab = 'spacelab',
	superhero = 'superhero',
	united = 'united',
	yeti = 'yeti'
}

export const THEMES_ARRAY = Object.keys(Theme).map(t => ({
	text: t.substring(0, 1).toLocaleUpperCase() + t.substring(1),
	value: t
}));

export const KNOWN_PERMISSIONS = {
	block: {
		one: true,
		op: {
			list: true,
			one: true,
			create: true,
			modify: true,
			delete: true
		}
	},
	chunk: {
		list: true,
		one: true,
		create: true
	},
	cmd: {
		list: true,
		one: true,
		run: true
	},
	economy: {
		currency: {
			list: true
		},
		account: {
			one: true
		}
	},
	entity: {
		list: true,
		one: true,
		create: true,
		modify: true,
		delete: true,
		method: true
	},
	history: {
		cmd: true,
		message: true
	},
	info: {
		info: true,
		stats: true,
		servlets: true
	},
	'interactive-message': {
		list: true,
		one: true,
		create: true
	},
	permission: {
		collection: {
			list: true,
			one: true,
			subject: {
				list: true,
				one: true
			}
		}
	},
	player: {
		list: true,
		one: true,
		modify: true,
		method: true
	},
	plugin: {
		list: true,
		one: true,
		toggle: true,
		config: {
			get: true,
			modify: true
		}
	},
	recipe: {
		list: true
	},
	registry: {
		one: true
	},
	server: {
		properties: {
			list: true,
			modify: true
		}
	},
	'tile-entity': {
		list: true,
		one: true,
		method: true
	},
	user: {
		list: true,
		create: true,
		modify: true,
		delete: true
	},
	world: {
		list: true,
		one: true,
		create: true,
		modify: true,
		delete: true,
		method: true
	}
};
