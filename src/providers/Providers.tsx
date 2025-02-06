import React from "react";
import { VRAProvider } from "@/store/vra-context.tsx";
import { HeroUIProvider } from "@heroui/react";
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
      <HeroUIProvider className={"h-full"} disableRipple>
        <SnackbarProvider autoHideDuration={5000} maxSnack={3}>
          {children}
        </SnackbarProvider>
      </HeroUIProvider>
    </VRAProvider>
  );
};

export default Providers;
