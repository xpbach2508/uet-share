"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { taxiDetail } from "@/app/api/apiEndpoints";
import { driverDto, taxiDto } from "@/lib/constant/dataInterface";

export default function DriverDetail({ params }: any) {
  const id = params.id;
  const [taxi, setTaxi] = useState<driverDto>();
  const [isActive, setActive] = useState();

  useEffect(() => {
    taxiDetail(id).then((res) => {
      setTaxi(res.data);
    });
  }, []);

  return (
    <div className="container">
      <Card className="">
        <CardHeader>
          <CardTitle>Thông tin Taxi</CardTitle>
        </CardHeader>
        <CardContent>
          {taxi && (
            <div className="grid w-full items-center gap-4">
              <div className="grid grid-cols-2 gap-4  ">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    defaultValue={taxi?.fullName || ""}
                    disabled={true}
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="nameCar">Car Name</Label>
                  <Input
                    id="nameCar"
                    defaultValue={taxi?.nameCar || ""}
                    disabled={true}
                    className="rounded-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4  ">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    defaultValue={taxi?.phone || ""}
                    disabled={true}
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    defaultValue={taxi?.email || ""}
                    disabled={true}
                    className="rounded-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4  ">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="licensePlate">License Plate</Label>
                  <Input
                    id="licensePlate"
                    defaultValue={taxi?.licensePlate || ""}
                    disabled={true}
                    className="rounded-full"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="seat">Seat</Label>
                  <Input
                    id="seat"
                    defaultValue={taxi?.seat || ""}
                    disabled={true}
                    className="rounded-full"
                  />
                </div>
              </div>

              {/* <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="phone">Status</Label>
                  <Input id="phone" defaultValue={user?.active ? 'Hoạt động' : 'Đình chỉ'} className="rounded-full" />
                </div>
              </div> */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
