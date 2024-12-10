"use client";

import { io } from "socket.io-client";
import Cookies from "js-cookie";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_SOCKET_BASE_URL || "http://localhost:8082";
const user = Cookies.get("user");
var accessToken = "";
if (user) {
  accessToken = JSON.parse(user).token;
}
export const socket = io(API_BASE_URL, {
  auth: {
    token: accessToken,
  },
  autoConnect: false,
});
