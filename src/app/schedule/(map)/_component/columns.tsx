import { scheduleDataDto, userData } from "@/lib/constant/dataInterface";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect } from "react";
import { useState } from "react";
import { HTTP_STATUS } from "@/lib/constant/constant";
import { useToast } from "@/components/ui/use-toast";
// const ActionCell: React.FC<{ row: any }> = ({ row }) => {
//   const schedule = row.original as scheduleDataDto;
//   const route = useRouter();
//   const path_name = usePathname();

//   return (
//   );
// };

export const columns_schedules: ColumnDef<any>[] = [
  {
    id: "stt",
    header: () => <div className="flex justify-center items-center"> STT </div>,
    cell: ({ row }) => (
      <div className="flex justify-center items-center">
        <span> {row.index + 1}</span>
      </div>
    ),
  },
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "groupId",
    header: "Group ID",
  },
  {
    accessorKey: "lat",
    header: "Latitude",
  },
  {
    accessorKey: "lng",
    header: "Longitude",
  },
  {
    accessorKey: "driverName",
    header: "Driver Name",
  },
  {
    accessorKey: "expectedTimeString",
    header: "Expected Time",
  },
  {
    accessorKey: "wait",
    header: "Wait Time",
    cell: ({ row }) => {
      return parseFloat(row.getValue("wait")) * 60 + " phút";
    },
  },
];
