export type userLoginData = {
  email: string;
  password: string;
};

export type passwordData = {
  password?: string;
  newPassword?: string;
};

export interface User {
  name: string;
  id: string;
  token: string;
  role: string;
}

export type userData = {
  _id?: string | null;
  name?: string | null;
  email?: string | null;
  password?: string | null;
};

export type loginReponseData = {
  jwt: string;
  id: string;
  username: string;
  role: string;
};

export type profileData = {
  name?: string | null;
  ssid?: string | null;
  email?: string | null;
};

export type filterUserData = {
  sort: string | undefined;
  name: string | undefined;
  page: number | undefined;
  limit: number | undefined;
};

export type scheduleDataDto = {
  id: number;
  groupId: number;
  lat: number;
  lng: number;
  driverName: string;
  licensePlate: string;
  nameCar: string;
  expectedTime: number;
  expectedTimeString: string;
  wait: number;
};

export type driverDto = {
  id: number;
  email: string;
  fullName: string;
  phone: string;
  password: string;
  licensePlate: string;
  seat: number;
  nameCar: string;
  carId: number;
};

export type createTaxiDto = {
  licensePlate: string;
  seat: number;
  nameCar: string;
};

export type taxiDto = {
  licensePlate: string;
  seat: number;
  nameCar: string;
};

export type taxiEmptyDto = {
  id: number;
  licensePlate: string;
  seat: number;
  nameCar: string;
};
