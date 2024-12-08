"use client";

import { toast, Toaster } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { createTaxi } from "@/app/api/apiEndpoints";
import { HTTP_STATUS } from "@/lib/constant/constant";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  licensePlate: z.string(),
  seat: z.string().transform((value) => {
    const parsed = Number(value);
    if (isNaN(parsed)) {
      throw new Error("Invalid number");
    }
    return parsed;
  }),
  nameCar: z.string(),
});

export default function TaxiForm({
  setClose,
  open,
}: {
  setClose: any;
  open: any;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameCar: "",
      licensePlate: "",
      seat: 1,
    },
  });

  const router = useRouter();
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const taxiData = {
      ...values,
    };
    // taxiData.seat = parseInt(taxiData.seat);
    try {
      const res = await createTaxi(taxiData);
      if (res.status === HTTP_STATUS.OK) {
        toast.success("Created taxi successfully", {
          description: new Date().toLocaleString(),
        });
        router.push(window.location.href);
        router.refresh();
        setClose(false);
      } else {
        toast.error("Error creating taxi", {
          description: "Kiểm tra lại thông tin",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("System error when creating taxi");
    }
  }

  return (
    <DialogContent className="">
      <DialogHeader>
        <DialogTitle>Tạo taxi</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <Form {...form}>
          <form
            className="space-y-3 md:space-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="nameCar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên xe</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Toyota"
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
              name="licensePlate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Biển số xe</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="30A-12345"
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
              name="seat"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số ghế</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="4"
                      {...field}
                      className="rounded-full"
                      type="number"
                    />
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
      </div>
    </DialogContent>
  );
}
