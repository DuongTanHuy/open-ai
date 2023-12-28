/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      boxShadow: {
        "3xl":
          "rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;",
        "4xl": "rgb(38, 57, 77) 0px 20px 30px -10px;",
        "5xl":
          "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;",
        "6xl":
          "rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;",
        "7xl":
          "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        "8xl":
          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        "9xl": "rgb(38, 57, 77) 0px 20px 30px -10px",
      },
      colors: {
        primary: "#05ADE9",
        secondary: "#046EAC",
        grayDark: "#292D32",
        grayLight: "#E7ECF3",
        tertiary: "#3A1097",
        accent: "#00D1ED",
        grayF3: "#F3EDFF",
        gray6B: "#6B6B6B",
        gray23: "#232323",
        gray4b: "#4B5264",
        grayf1: "#F1F1F3",
        gray80: "#808191",
        black: "#171725",
      },
      backgroundImage: {
        "primary-gradient": "linear-gradient(to bottom, #2cccff, #f62682)",
        "secondary-gradient": "linear-gradient(to top, #faa307, #fdba74)",
        "2xl-gradient": "linear-gradient(0deg, #fff, #03a9f4)",
      },
    },
  },
  plugins: [],
};
