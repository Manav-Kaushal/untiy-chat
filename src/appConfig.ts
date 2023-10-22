export const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === "production";

export const appConfig = {
  name: "Unity Chat",
  apiUrl: isProduction ? "http://localhost:3001" : "http://localhost:3001",
  websiteUrl: isProduction
    ? "https://unitychat.vercel.app/"
    : "http://localhost:3000/",
  logo: {
    light: "",
    dark: "",
  },
  social: {
    twitter: "",
    facebook: "",
    instagram: "",
  },
};

export const appColors = {
  primary: "#3498db",
  secondary: "#e74c3c",
  success: "#2ecc71",
  danger: "#e67e22",
  info: "#27ae60",
};
