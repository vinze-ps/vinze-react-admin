import React, {
  FormEvent,
  useCallback,
  useContext,
  useReducer,
  useState,
} from "react";
import { IVRAProps, IVRAUserCredentials } from "@/@types/VinzeAdminPanel.types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Divider
} from "@nextui-org/react";
import { VRAContext } from "@/store/VRAContext";
import IonIcon from '@reacticons/ionicons';

interface IUserDataActions {
  value: string;
  type: "SET_USERNAME" | "SET_PASSWORD";
}

const Login = () => {
  const VRAProps: IVRAProps | null = useContext(VRAContext).state.VRAProps;
  const [showInputs, setShowInputs] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loadingLoginGoogle, setLoadingLoginGoogle] = useState<boolean>(false);
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);
  const [formState, dispatchForm] = useReducer(
    (state: IVRAUserCredentials, action: IUserDataActions) => {
      switch (action.type) {
        case "SET_USERNAME":
          return { ...state, username: action.value };
        case "SET_PASSWORD":
          return { ...state, password: action.value };
        default:
          return { ...state };
      }
    },
    { username: "", password: "" },
  );

  const { username, password } = formState;

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoadingLogin(true);
      VRAProps?.auth
        ?.onSubmit("DEFAULT", { username, password })
        .then((result) => {
          if (!result.status) setLoadingLogin(false);
        });
    },
    [VRAProps?.auth, password, username],
  );

  const handleClickLoginGoogle = useCallback(() => {
    setLoadingLoginGoogle(true);
    VRAProps?.auth
      ?.onSubmit("GOOGLE", { username, password })
      .then((result) => {
        if (!result.status) setLoadingLoginGoogle(false);
      });
  }, [VRAProps?.auth, password, username]);

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
          <form
            className="flex flex-col w-full gap-[1rem]"
            onSubmit={handleSubmit}
          >
            <Input
              onValueChange={(value) =>
                dispatchForm({ type: "SET_USERNAME", value })
              }
              className={"input-transparent"}
              value={username}
              size={"lg"}
              placeholder={"Login"}
              required
            />
            <Input
              onValueChange={(value) =>
                dispatchForm({ type: "SET_PASSWORD", value })
              }
              size={"lg"}
              value={password}
              placeholder={"Password"}
              className={"input-transparent"}
              type={showPassword ? "text" : "password"}
              endContent={
                password ? (
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
                ) : (
                  <></>
                )
              }
              required
            />
            {/*<Checkbox />*/}
            <Button
              className="w-full bg-foreground text-background mt-2 !text-[1rem]"
              type="submit"
              size={"lg"}
              color="primary"
              isLoading={loadingLogin}
            >
              Log in
            </Button>
            {/* <FormControl fullWidth>
            <TextField
              className={styles["input"]}
              onChange={(e) => dispatchForm({ type: "SET_USERNAME", value: e.target.value })}
              variant="outlined"
              label="Login"
              size="small"
              required
            />
            <TextField
              className={styles["input"]}
              onChange={(e) => dispatchForm({ type: "SET_PASSWORD", value: e.target.value })}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    
                  </InputAdornment>
                ),
              }}
              variant="outlined"
              label="Hasło"
              size="small"
              required
            />
            <LoadingButton
              loading={loadingLogin}
              className={styles["submit"]}
              type="submit"
              variant="contained"
              sx={{
                "& .MuiCircularProgress-root": {
                  color: "var(--vra-text-primary)",
                },
              }}
            >
              <IonIconCustom name="log-in-outline" style={{ margin: "0 0.5rem 0 0" }} />
              Zaloguj się
            </LoadingButton>
          </FormControl> */}
          </form></>}
          {!showInputs && <Button
            className="w-full bg-zinc-600 text-foreground mt-2 !text-[1rem] bg-opacity-20"
            onClick={() => setShowInputs(true)}
            size={"lg"}
            color="primary"
          >
            Continue with login
          </Button>}
        </CardBody>
        {/*<Divider className="mt-[0.75rem]" />*/}
        {/*<CardFooter className="flex items-center justify-between">*/}
        {/*  <p className="text-[0.75rem]">© {new Date().getFullYear()} vinze</p>*/}
        {/*  /!*<p className="text-[0.75rem]">version {packagejson.version}</p>*!/*/}
        {/*</CardFooter>*/}
      </Card>
      <div
        style={{
          background: `radial-gradient(
            150% 150% at 20% 20%, 
            rgb(10, 10, 40) 20%,   
            rgb(20, 22, 50) 35%,   
            rgb(30, 34, 110) 50%,   
            rgb(5, 56, 150) 65%,   
            rgb(4, 120, 200) 75%,  
            rgb(0, 180, 220) 85%,  
            rgb(0, 230, 240) 100%  
          )`,
        }}
        className={"absolute top-0 left-0 w-full h-full"}
      ></div>
    </div>
  );
};

export default React.memo(Login);
