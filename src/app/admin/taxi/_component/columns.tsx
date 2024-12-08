import { taxiDto } from "@/lib/constant/dataInterface";
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
import { Badge } from "@/components/ui/badge";

const ActionCell: React.FC<{ row: any }> = ({ row }) => {
  const taxi = row.original;
  const route = useRouter();
  const path_name = usePathname();
  const newRoute = path_name + "/";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Chi tiết</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={(e) => {
            route.push(newRoute + taxi.id);
          }}
        >
          Xem thông tin
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<taxiDto>[] = [
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
    accessorKey: "fullName",
    header: "Full Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "licensePlate",
    header: "License Plate",
  },
  {
    accessorKey: "seat",
    header: "Seat",
  },
  {
    accessorKey: "nameCar",
    header: "Name Car",
  },
  {
    accessorKey: "carId",
    header: "Car ID",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ActionCell,
  },
];
