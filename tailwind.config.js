/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        //https://getcssscan.com/css-box-shadow-examples
        'custom-card-mui': "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        'custom-0': 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
        'custom-1': 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
        'custom-7': 'rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px',
        myShadow1: "4.1px -5px 0 0  rgb(241 245 249)",
        myShadow2: "-4.1px -5px 0 0  rgb(241 245 249)",
        // Thêm nhiều tùy chỉnh boxShadow khác nếu cần
      },
      colors: {
        // Thêm màu tùy chỉnh ở đây
        'navy-blue': '#05445E',
        'blue-grotto': '#189AB4',
        'blue-green': '#75E6DA',
        'baby-blue': '#D4F1F4',
        'main': "#fcfbfc"
        // Thêm nhiều màu sắc khác nếu cần
      },
      scrollbarWidth: {
        thin: '6px',
        custom: '25px',
      },
      scrollbarRadius: {
        custom: '10px', // Border-radius tùy chỉnh cho thanh scrollbar
      },
    },
  },

  plugins: [
    // eslint-disable-next-line no-undef
    require('tailwind-scrollbar'),
  ],
}