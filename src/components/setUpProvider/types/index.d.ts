declare module 'AppTypes' {
	export interface UserServiceConfiguration {
		userInfo: UserInfo;
		selectedPlan: Plan | null;
		monthly: boolean;
		addons: Addon[] | [];
	}

	export interface UserInfo {
		nameCompany: string;
		region: string;
		address: string;
		webCompnany: string;
		mediaSocial: string;
	}
	
	export interface Plan {
		name: string;
		icon: string;
		monthlyPrice: number;
	}

	export interface Addon {
		name: string;
		description: string;
		monthlyPrice: number;
	}
}
