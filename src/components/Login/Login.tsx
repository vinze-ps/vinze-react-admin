import React, {
  useContext,
  useState,
} from "react";
import { IVRAProps } from "@/@types/VinzeAdminPanel.types";
import {
  Card,
  CardBody,
  CardHeader,
  Divider
} from "@nextui-org/react";
import { VRAContext } from "@/store/VRAContext";
import IonIcon from '@reacticons/ionicons';
import {Input} from "@/components/ui/input.tsx";
import {Button} from "@/components/ui/button.tsx";
import Ripple from "@/components/magicui/ripple";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().min(6).max(50).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, "Password must contain at least one letter and one number"),
})

const Login = () => {
  const VRAProps: IVRAProps | null = useContext(VRAContext).state.VRAProps;
  const [showInputs, setShowInputs] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loadingLoginGoogle, setLoadingLoginGoogle] = useState<boolean>(false);
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const handleSubmit =
    (values: z.infer<typeof formSchema>) => {
      setLoadingLogin(true);
      VRAProps?.auth
        ?.onSubmit("DEFAULT", values)
        .then((result) => {
          if (!result.status) setLoadingLogin(false);
        });
    };

  const handleClickLoginGoogle = () => {
    setLoadingLoginGoogle(true);
    VRAProps?.auth
      ?.onSubmit("GOOGLE", { username: form.getValues("username"), password: form.getValues("password") })
      .then((result) => {
        if (!result.status) setLoadingLoginGoogle(false);
      });
  };

  return (
    <div className="left-0 top-0 fixed w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-[var(--vra-black)]">
      <Card className="p-[1.25rem] max-w-[27.5rem] w-full z-[10] bg-background bg-opacity-60 backdrop-blur-lg rounded-3xl">
        <CardHeader className="flex flex-col items-center text-center">
          {/*<Logo*/}
          {/*  style={{ width: "60px", height: "auto", marginBottom: "1.5rem" }}*/}
          {/*  className={"[&_path]:fill-[#fff]"}*/}
          {/*/>*/}
          <h1 className="text-foreground font-medium text-3xl mb-2">Welcome</h1>
          <span className="text-zinc-400 text-md font-medium">
            You can login here to your <strong>{VRAProps?.config.companyName}</strong>'s administrator panel.
          </span>
        </CardHeader>
        <CardBody>
        {VRAProps?.auth.google && (
            <Button
              startContent={<IonIcon name="logo-google" />}
              onClick={handleClickLoginGoogle}
              isLoading={loadingLoginGoogle}
              variant={"bordered"}
              size={"lg"}
              className={"bg-primary border-none !text-[1rem]"}
            >
              Continue with Google
            </Button>
          )}
          {showInputs && <>
          <div className="my-6 relative">
            <span
              className={
                "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-sm text-default-500"
              }
            >
              OR
            </span>
            <div className={"w-full flex"}>
            <Divider className={"w-[calc(50%-1.5rem)]"} />
            <Divider className={"w-[calc(50%-1.5rem)] ms-auto"} /></div>
          </div>
          {VRAProps?.auth.error && (
            <div
              className={
                "bg-red-300 mb-6 p-2 py-3 text-[0.9rem] text-center rounded-lg text-[var(--vra-background-primary)]"
              }
            >
              {VRAProps.auth.error.message}
            </div>
          )}
          <Form {...form}>
          <form
            className="flex flex-col w-full gap-[1rem]"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        isInvalid={!!form.formState.errors.username?.message}
                        errorMessage={form.formState.errors.username?.message}
                        placeholder={"Username"}
                        isTransparent
                        size={"lg"}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          isInvalid={!!form.formState.errors.password?.message}
                          errorMessage={form.formState.errors.password?.message}
                          size={"lg"}
                          placeholder={"Password"}
                          isTransparent
                          type={showPassword ? "text" : "password"}
                          endContent={
                            field.value ? (
                              <>
                                {showPassword ? (
                                  <IonIcon
                                    name="eye-off-outline"
                                    className={"cursor-pointer"}
                                    onClick={() => setShowPassword(false)}
                                  />
                                ) : (
                                  <IonIcon
                                    name="eye-outline"
                                    className={"cursor-pointer"}
                                    onClick={() => setShowPassword(true)}
                                  />
                                )}
                              </>
                            ) : undefined
                          }
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
              />
            <Button
              className="w-full bg-foreground text-background mt-2 !text-[1rem]"
              type="submit"
              size={"lg"}
              color="primary"
              isLoading={loadingLogin}
            >
              Log in
            </Button>
          </form>
          </Form>
          </>}
          {!showInputs && <Button
            className="w-full bg-zinc-600 text-foreground mt-2 !text-[1rem] bg-opacity-20"
            onClick={() => setShowInputs(true)}
            size={"lg"}
            color="primary"
          >
            Continue with credentials
          </Button>}
        </CardBody>
      </Card>
      <Ripple className={"bg-gradient-to-r from-primary"} />
    </div>
  );
};

export default React.memo(Login);
