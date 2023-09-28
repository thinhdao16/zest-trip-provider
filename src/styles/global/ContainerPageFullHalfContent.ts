import { styled, Box } from "@mui/material";

export const ContainerPageFullHalfContent = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: "12px 0 12px 0",
  overflow: "auto",
  height: "100vh",
  position: "relative",
  "&::-webkit-scrollbar-track": {
    boxShadow: "inset 0 0 6px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#F5F5F5",
  },
  "&::-webkit-scrollbar": {
    width: "5px",
    backgroundColor: "#F5F5F5",
    scrollbarWidth: "2px",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#000000",
    border: "2px solid #555555",
  },
  "&::before": {
    content: "''",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1, // Đặt z-index thấp hơn để hiển thị phía sau nội dung
    backgroundImage: "url('path/to/your-image.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.5, // Điều chỉnh độ mờ của background nếu cần
  },
}));
