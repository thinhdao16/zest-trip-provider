declare module "AppTypes" {
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

    taxCode: string;
    address_name: string;
    address_district: string;
    address_ward: string;
    address_province: string;
    address_country: string;
    file: file;
  }

  export interface Plan {
    serviceType: any;
    policyCancell: any;
    policyConfirm: any;
  }

  export interface Addon {
    name: string;
    description: string;
    monthlyPrice: number;
  }
}
