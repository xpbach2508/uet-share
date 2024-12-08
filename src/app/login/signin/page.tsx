"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Link from "next/link";
import { loginUser } from "@/app/api/apiEndpoints";
import { HTTP_STATUS } from "@/lib/constant/constant";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth/useAuth";
import axios, { AxiosError } from "axios";
import { loginReponseData } from "@/lib/constant/dataInterface";
const formSchema = z.object({
  email: z.string().min(2, {
    message: "Email must be at least 2 characters.",
  }),
  password: z.string(),
});

export default function LoginForm() {
  type formData = z.infer<typeof formSchema>;
  const form = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { user, login, logout } = useAuth();
  const router = useRouter();
  const [loadingMessage, setLoading] = useState("Đăng nhập");
  const [otpValue, setOTP] = useState("");
  const [authData, setAuthData] = useState({ email: "", password: "" });

  useEffect(() => {
    logout();
  }, []);

  function handleLogin(res: loginReponseData) {
    const token = "Bearer " + res.jwt;
    const id = res.id;
    const name = res.username;
    const role = res.role;

    const session = { token, id, name, role };
    login(session);
    router.push("/admin");
  }

  async function onSubmit(values: formData) {
    setAuthData(values);
    setLoading("Loading");
    console.log(values);
    try {
      console.log("?");
      await loginUser(values).then((res: any) => {
        if (res.status == HTTP_STATUS.OK) {
          setLoading("Thành công");
          console.log(res);
          if (res.data.jwt) {
            handleLogin(res.data);
          }
        }
      });
    } catch (err) {
      const error = err as Error | AxiosError;
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data.message);
        setLoading("Đăng nhập");
      }
    }
  }
  return (
    <section className="bg-[url(/Shape.jpg)] bg-cover">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          href={"/"}
          className="flex items-center mb-6 text-2xl font-semibold text-white"
        >
          Vua Tiền Tệ
        </Link>
        {
          <div className="w-full bg-card rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Đăng nhập
              </h1>
              <Form {...form}>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tài khoản</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Tài khoản"
                            {...field}
                            className="rounded-full"
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
                            placeholder="Password"
                            {...field}
                            className="rounded-full"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className={`w-full ${
                      loadingMessage == "Thành công" ? "bg-lime-600" : ""
                    }`}
                    disabled={loadingMessage != "Đăng nhập"}
                  >
                    {loadingMessage}
                  </Button>
                </form>
              </Form>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Chưa có tài khoản?
                <Link
                  href={"/login/signup"}
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  {" "}
                  Đăng kí
                </Link>
              </p>
            </div>
          </div>
        }
      </div>
    </section>
  );
}
