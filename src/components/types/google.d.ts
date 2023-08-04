declare global {
  interface Window {
    google: any;
  }
}

declare namespace google {
  namespace accounts {
    namespace id {
      interface CallbackResponse {
        credential: string;
        select_by: string;
        // ...
        // Thêm các thuộc tính khác của đối tượng CallbackResponse
      }
    }
  }
}
