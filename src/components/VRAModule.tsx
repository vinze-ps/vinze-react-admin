import { IVRAModule } from "@/types/VRA.types.ts";
import { useContext, useEffect } from "react";
import { VraContext } from "@/store/vra-context.tsx";

function VRAModule<T>(moduleProps: IVRAModule<T>) {
  const { dispatchVRA } = useContext(VraContext);

  useEffect(() => {
    dispatchVRA({
      type: "REGISTER_MODULE",
      payload: moduleProps,
    });
  }, [dispatchVRA, moduleProps]);

  return null;
}

export default VRAModule;
