const host = window.location.hostname;
export const API = host.startsWith("192.168") || host === "localhost"
  ? "http://192.168.0.228:3000"
  : "http://112.218.47.101:3000";
