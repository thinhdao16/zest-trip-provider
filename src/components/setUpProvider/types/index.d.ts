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
    address_district: { full_name: string; code: string };
    address_ward: { full_name: string; code: string };
    address_province: { full_name: string; code: string };
    address_country: string;
    file: file;
    avt: file;
    banner: file;
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
