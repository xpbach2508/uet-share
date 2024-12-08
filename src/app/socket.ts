"use client";

import { io } from "socket.io-client";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8081/";
export const socket = io(API_BASE_URL, {
  path: "/socket/",
  autoConnect: false,
});
