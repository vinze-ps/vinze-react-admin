import React from "react";
import { VRAProvider } from "@/store/VRAContext";
import { NextUIProvider } from "@nextui-org/react";
import { SnackbarProvider } from "notistack";
import { IVRA } from "@/types/VRA.types";
const Providers = ({
  children,
  VRAProps,
}: {
  children: React.ReactNode;
  VRAProps: IVRA;
}) => {
  return (
    <VRAProvider VRAProps={VRAProps}>
      <NextUIProvider className={"h-full"} disableRipple>
        <SnackbarProvider autoHideDuration={5000} maxSnack={3}>
          {children}
        </SnackbarProvider>
      </NextUIProvider>
    </VRAProvider>
  );
};

export default Providers;
