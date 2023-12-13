/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        //https://getcssscan.com/css-box-shadow-examples
        "custom-card-mui":
          "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
        "custom-0": "rgba(149, 157, 165, 0.2) 0px 8px 24px",
        "custom-1": "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
        "custom-3": "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        "custom-5": "rgba(0, 0, 0, 0.24) 0px 3px 8px",

        "custom-7":
          "rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
        "custom-59": "rgba(33, 35, 38, 0.1) 0px 10px 10px -10px",
        myShadow1: "4.1px -5px 0 0  rgb(241 245 249)",
        myShadow2: "-4.1px -5px 0 0  rgb(241 245 249)",
        // Thêm nhiều tùy chỉnh boxShadow khác nếu cần
      },
      colors: {
        // Thêm màu tùy chỉnh ở đây
        // "navy-blue": "#043730",
        "navy-blue": "#05445E",

        "blue-grotto": "#189AB4",
        "blue-green": "#75E6DA",
        "baby-blue": "#D4F1F4",
        main: "rgba(5, 68, 94, 0.04)",
        "navy-blue-opacity-5": "rgba(5, 68, 94, 0.4)",
        "navy-blue-opacity-1": "rgba(5, 68, 94, 0.04)",
        "navy-blue-opacity-2": "rgba(5, 68, 94, 0.2)",
        "navy-blue-opacity-3": "rgba(5, 68, 94, 0.3)",

        "green-tag": "#96af51",
        "green-tag-opa": "#f1f5e5",
        // Thêm nhiều màu sắc khác nếu cần
      },

      width: { "w-1": "1px", "w-2": "2px" },
      height: { "h-1": "1px", "h-2": "2px" },
      scrollbarWidth: {
        thin: "6px",
        custom: "25px",
      },
      scrollbarRadius: {
        custom: "10px", // Border-radius tùy chỉnh cho thanh scrollbar
      },
    },
  },

  plugins: [
    // eslint-disable-next-line no-undef
    require("tailwind-scrollbar"),
  ],
};
