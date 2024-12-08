"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { useDebounce } from "@/lib/hook/useDebounce";
import { DataTable } from "@/components/ui/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { columns } from "./_component/columns";
import { getListActiveTaxi } from "@/app/api/apiEndpoints";
import { useEffect, useState } from "react";
import React from "react";
import TaxiForm from "./_component/TaxiForm";
import { CarTaxiFrontIcon, UserPlus } from "lucide-react";
import { taxiDto } from "@/lib/constant/dataInterface";
import DriverForm from "./_component/DriverForm";

export default function Page() {
  const [listTaxi, setListTaxi] = useState<taxiDto[]>([]);
  const [openVerifyTaxi, setOpenVerifyTaxi] = useState(false);
  const [openVerifyDriver, setOpenVerifyDriver] = useState(false);

  useEffect(() => {
    getListActiveTaxi().then((res) => {
      setListTaxi(res.data);
    });
  }, [openVerifyDriver]);

  const columnsMemo = React.useMemo(() => columns, []);
  return (
    <div className="container">
      <div className="flex justify-between mb-5">
        <div>
          <Dialog open={openVerifyTaxi} onOpenChange={setOpenVerifyTaxi}>
            <DialogTrigger asChild>
              <Button>
                <CarTaxiFrontIcon />
                <p className="ml-2">Tạo taxi</p>
              </Button>
            </DialogTrigger>

            <TaxiForm setClose={setOpenVerifyTaxi} open={openVerifyTaxi} />
          </Dialog>
        </div>
        <div>
          <Dialog open={openVerifyDriver} onOpenChange={setOpenVerifyDriver}>
            <DialogTrigger asChild>
              <Button className="bg-sky-600">
                <UserPlus />
                <p className="ml-2">Tạo driver</p>
              </Button>
            </DialogTrigger>

            <DriverForm
              setClose={setOpenVerifyDriver}
              open={openVerifyDriver}
            />
          </Dialog>
        </div>
      </div>
      <div>{<DataTable columns={columnsMemo} data={listTaxi} />}</div>
    </div>
  );
}
