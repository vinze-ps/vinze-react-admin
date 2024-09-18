import React, { useContext, useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { IVRAModule, TVRADialogAddEditAction } from "@/@types/VRA.types";
import { VRAContext } from "@/store/VRAContext";
import { Plus } from "lucide-react";
import { Button } from "@nextui-org/react";
import { getVRAModulesColumns } from "@/lib/utils.tsx";

const DisplayDefault = ({
  module,
  dispatchDialogAddEdit,
}: {
  module: IVRAModule<any>;
  dispatchDialogAddEdit: React.Dispatch<TVRADialogAddEditAction>;
}) => {
  const { state } = useContext(VRAContext);
  const { currentModule } = state.menu;

  const columns = useMemo(
    () =>
      getVRAModulesColumns(module.fields, {
        onEditRow: ({ row }) => {
          dispatchDialogAddEdit({ type: "OPEN" });
          dispatchDialogAddEdit({ type: "SET_MODE", payload: "EDIT" });
          console.log(row.original);
        },
      }),
    [module.fields, dispatchDialogAddEdit],
  );

  return (
    <>
        <div className={"flex gap-2 items-center"}>
          <h1 className={"text-xl text-white"}>{module.config.friendlyName || "Collection"}</h1>
          {/*<p className={"!mt-0 text-md"}>*/}
        </div>
        <Button
          className={"bg-primary text-foreground"}
          onClick={() => {
            dispatchDialogAddEdit({ type: "OPEN" });
            dispatchDialogAddEdit({ type: "SET_MODE", payload: "ADD" });
          }}
        >
          <Plus size={"1rem"} className={"me-1"} />
          New record
        </Button>
        <DataTable columns={columns} data={module.data} /></>
  );
};

export { DisplayDefault };
