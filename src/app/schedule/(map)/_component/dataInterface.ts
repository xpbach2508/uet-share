export interface Marker {
  lat: number;
  lng: number;
  driverName: string;
  licensePlate: string;
  nameCar: string;
  groupId: number;
  expectedTimeString: string;
  wait: number;
}

export interface NoStartMarker {
  lat: number;
  lng: number;
  expectedTimeString: string;
  wait: number;
}

export interface Schedule {
  origin: [number, number];
  destination: [number, number];
  transportMode: string;
}
