export type PersonalInfo = {
    id: string;
    email: string;
    password: string;
    phone_number: string | null;
    full_name: string | null;
    address_country: string;
    address_district: string;
    address_name: string;
    address_province: string;
    address_ward: string;
    avatar_image_url: string;
    banner_image_url: string;
    business_license: string;
    company_name: string;
    created_at: string;
    description: string;
    user_id: string;
    // ... (Thêm các trường còn lại tùy vào nhu cầu)
  };