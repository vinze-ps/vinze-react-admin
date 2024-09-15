import React from "react";
import { VRAProvider } from "@/store/VRAContext";
import { NextUIProvider } from "@nextui-org/react";
import { SnackbarProvider } from "notistack";
import { IVRAProps } from "@/@types/VinzeAdminPanel.types";
const Providers = ({
  children,
  VRAProps,
}: {
  children: React.ReactNode;
  VRAProps: IVRAProps;
}) => {
  return (
    <VRAProvider VRAProps={VRAProps}>
      <NextUIProvider>
        <SnackbarProvider autoHideDuration={5000} maxSnack={3}>
          {children}
        </SnackbarProvider>
      </NextUIProvider>
    </VRAProvider>
  );
};

export default Providers;
