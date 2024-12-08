"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, Toaster } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createDriver, getListTaxiEmpty } from "@/app/api/apiEndpoints";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HTTP_STATUS } from "@/lib/constant/constant";
import { Input } from "@/components/ui/input";
import { DropdownMenu } from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { taxiEmptyDto } from "@/lib/constant/dataInterface";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  email: z.string().email(),
  fullName: z.string().min(1),
  password: z.string().min(6),
  phone: z.string().min(10),
  carId: z.string().transform((value) => {
    const parsed = Number(value);
    if (isNaN(parsed)) {
      throw new Error("Invalid number");
    }
    return parsed;
  }),
});

const DriverForm = ({ setClose, open }: { setClose: any; open: any }) => {
  const [taxis, setTaxis] = useState<taxiEmptyDto[]>([]);
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      fullName: "",
      password: "",
      phone: "",
      carId: 1,
    },
  });
  async function fetchTaxis() {
    try {
      const response = await getListTaxiEmpty();
      setTaxis(response.data);
    } catch (error) {
      console.error("Error fetching taxis:", error);
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await createDriver(values);
      if (res.status === HTTP_STATUS.OK) {
        toast.success("Created driver successfully", {
          description: new Date().toLocaleString(),
        });
        router.push(window.location.href);
        router.refresh();
        setClose(false);
      } else {
        toast.error("Error creating driver", {
          description: "Kiểm tra lại thông tin",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("System error when creating driver");
    }
  }

  return (
    <DialogContent className="">
      <DialogHeader>
        <DialogTitle>Tạo tài xế</DialogTitle>
      </DialogHeader>
      <Form {...form}>
        <form
          className="space-y-3 md:space-y-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="example@example.com"
                    {...field}
                    className="rounded-full"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    {...field}
                    className="rounded-full"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="******"
                    {...field}
                    className="rounded-full"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="1234567890"
                    {...field}
                    className="rounded-full"
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="carId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Car</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                    onOpenChange={(isOpen) => {
                      if (isOpen) {
                        fetchTaxis();
                      }
                    }}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Taxi" />
                    </SelectTrigger>
                    <SelectContent>
                      {taxis.map((taxi) => (
                        <SelectItem key={taxi.id} value={taxi.id.toString()}>
                          {taxi.licensePlate +
                            " - " +
                            taxi.nameCar +
                            " - " +
                            taxi.seat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit">Create taxi</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
};

export default DriverForm;
