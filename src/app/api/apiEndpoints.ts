import {
  createTaxiDto,
  filterUserData,
  userData,
  userLoginData,
} from "@/lib/constant/dataInterface";
import request from "./request";

//authentication
export function loginUser(data: userLoginData) {
  return request.post("/auth/login", data);
}

export function createCustomer(data: userData) {
  return request.post("/user/customer", { data: data });
}

//list
export function getAllUser(data: filterUserData) {
  return request.get("/user/getAll", { params: { ...data } });
}

//user profile
export function getProfile() {
  return request.get("/user/profile");
}

export function updateProfile(data: any) {
  return request.put("/user/profile", { data: data });
}

export function updatePassword(data: any) {
  return request.put("/user/password", { data: data });
}

export function joinAuctionSession(auction_id: String) {
  return request.get(`/auction/${auction_id}/joinsession`);
}

//request
export function getAllRequest() {
  return request.get("/request/served");
}

//group
export function getAllOnlineGroup() {
  return request.get("/group/online");
}

//schedule
export function listScheduleAdminProphet() {
  return request.get("/schedule/admin-prophet");
}

//taxi
export function getListActiveTaxi() {
  return request.get("/taxi/taxi_active");
}

export function createTaxi(data: createTaxiDto) {
  return request.post("/taxi/create", data);
}

export function taxiDetail(driver_id: String) {
  return request.get("driver/find_by_id", { params: { driverId: driver_id } });
}

export function getListTaxiEmpty() {
  return request.get("/taxi/taxi_empty");
}

//driver
export function createDriver(data: any) {
  return request.post("/auth/signup_driver", data);
}
