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
  CardFooter,
  CardHeader,
  Divider,
} from "@nextui-org/react";
import { VRAContext } from "@/store/VRAContext";
import { Input } from "@/components/ui/input";
import IonIcon from '@reacticons/ionicons';

interface IUserDataActions {
  value: string;
  type: "SET_USERNAME" | "SET_PASSWORD";
}

const Login = () => {
  const VRAProps: IVRAProps | null = useContext(VRAContext).state.VRAProps;
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
      <Card className="p-[1rem] pt-[2rem] max-w-[25rem] w-full z-[10] border-1 border-neutral-900 bg-background bg-opacity-80 backdrop-blur-lg">
        <CardHeader className="flex flex-col items-center text-center">
          {/*<Logo*/}
          {/*  style={{ width: "60px", height: "auto", marginBottom: "1.5rem" }}*/}
          {/*  className={"[&_path]:fill-[#fff]"}*/}
          {/*/>*/}
          <h1 className="text-default-900 font-medium text-3xl">Welcome!</h1>
          <span className="text-default-500 text-md font-medium">
            Administration panel,{" "}
            <strong>{VRAProps?.config.companyName}</strong>.
          </span>
        </CardHeader>
        <CardBody>
          {VRAProps?.auth.google && (
            <Button
              startContent={<IonIcon name="logo-google" />}
              onClick={handleClickLoginGoogle}
              isLoading={loadingLoginGoogle}
              variant={"bordered"}
              className={"rounded-lg bg-primary border-none"}
            >
              Login with Google
            </Button>
          )}
          {/*<div className="my-8 relative">*/}
          {/*  <span*/}
          {/*    className={*/}
          {/*      "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 absolute text-sm text-default-500 bg-background px-4"*/}
          {/*    }*/}
          {/*  >*/}
          {/*    OR*/}
          {/*  </span>*/}
          {/*  <Divider />*/}
          {/*</div>*/}
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
            {/*<Input*/}
            {/*  placeholder={"Enter your login..."}*/}
            {/*  onValueChange={(value) =>*/}
            {/*    dispatchForm({ type: "SET_USERNAME", value })*/}
            {/*  }*/}
            {/*  value={username}*/}
            {/*  label={"Login"}*/}
            {/*  required*/}
            {/*/>*/}
            {/*<Input*/}
            {/*  onValueChange={(value) =>*/}
            {/*    dispatchForm({ type: "SET_PASSWORD", value })*/}
            {/*  }*/}
            {/*  value={password}*/}
            {/*  label={"Password"}*/}
            {/*  placeholder={"Enter your password..."}*/}
            {/*  type={showPassword ? "text" : "password"}*/}
            {/*  endContent={*/}
            {/*    password ? (*/}
            {/*      <>*/}
            {/*        {showPassword ? (*/}
            {/*          <IonIconCustom*/}
            {/*            name="eye-off-outline"*/}
            {/*            style={{ margin: "0 0.5rem 0 0", cursor: "pointer" }}*/}
            {/*            color="var(--vra-white)"*/}
            {/*            onClick={() => setShowPassword(false)}*/}
            {/*          />*/}
            {/*        ) : (*/}
            {/*          <IonIconCustom*/}
            {/*            name="eye-outline"*/}
            {/*            style={{ margin: "0 0.5rem 0 0", cursor: "pointer" }}*/}
            {/*            color="var(--vra-white)"*/}
            {/*            onClick={() => setShowPassword(true)}*/}
            {/*          />*/}
            {/*        )}*/}
            {/*      </>*/}
            {/*    ) : (*/}
            {/*      <></>*/}
            {/*    )*/}
            {/*  }*/}
            {/*  required*/}
            {/*/>*/}
            {/*<Checkbox />*/}
            <Button
              className="w-full bg-foreground text-background rounded-lg mt-2"
              type="submit"
              size={"md"}
              color="primary"
              isLoading={loadingLogin}
            >
              Continue
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
          </form>
        </CardBody>
        <Divider className="mt-[0.75rem]" />
        <CardFooter className="flex items-center justify-between">
          <p className="text-[0.75rem]">© {new Date().getFullYear()} vinze</p>
          {/*<p className="text-[0.75rem]">version {packagejson.version}</p>*/}
        </CardFooter>
      </Card>
      <div
        style={{
          background: `radial-gradient(
          241.5% 113.1% at -66.4% 35.9%,
          rgb(0, 0, 0) 28%,
          rgb(5, 1, 35) 43.1%,
          rgb(4, 67, 162) 56.4%,
          rgb(0, 68, 255) 66.5%,
          rgb(0, 102, 255) 71.7%,
          rgb(0, 204, 255) 80.6%,
          rgb(0, 255, 208) 91.9%
        )`,
        }}
        className={"absolute top-0 left-0 w-full h-full"}
      ></div>
    </div>
  );
};

export default React.memo(Login);
