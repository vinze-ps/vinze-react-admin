import {IVRAModuleProps} from "@/@types/VinzeAdminPanel.types.ts";
import {useContext, useEffect} from "react";
import {VRAContext} from "@/store/VRAContext.tsx";

function VRAModule<T>(moduleProps: IVRAModuleProps<T>) {
const {dispatchVRA} = useContext(VRAContext);

  useEffect(() => {
    dispatchVRA({
      type: "REGISTER_MODULE",
      payload: moduleProps,
    });
  }, [dispatchVRA, moduleProps]);

  return null;
}

export default VRAModule;
