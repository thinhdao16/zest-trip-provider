interface TicketOnBooking {
  booking_id: string;
  original_price: string;
  paid_price: string;
  quantity: number;
  ticket_type_id: number;
}

export interface BookingOnTour {
  Provider: {
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
    email: string;
    id: string;
    phone: string;
    service_type: string;
    social_media: string[]; // Nếu có mảng các social media
    status: string;
    tax_code: string;
    updated_at: string;
    user_id: string;
  };
  address_country: string;
  address_district: string;
  address_name: string;
  address_province: string;
  address_ward: string;
  book_before: number;
  created_at: string;
  description: string;
  duration: number;
  footnote: string;
  id: string;
  name: string;
  provider_id: string;
  refund_before: number;
  status: string;
  tour_images: string[]; // Nếu có mảng các hình ảnh tour
  tour_location_type: string;
  track_point: number;
  updated_at: string;
  TicketOnBooking: TicketOnBooking[];
}

interface TicketType {
  id: number;
  name: string;
  price: string;
}

export interface StateBooking {
  booking: BookingOnTour | null;
  ticketTypes: TicketType[]; // Nếu có danh sách loại vé
}

// Đối với Redux, bạn có thể sử dụng createAction và createReducer để quản lý state
// Đây chỉ là một ví dụ đơn giản, có thể phức tạp hơn tùy thuộc vào cách bạn tổ chức store Redux của mình.
