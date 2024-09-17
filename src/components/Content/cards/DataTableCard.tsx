import React, { useContext, useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { getVRAModulesColumns } from "@/constants/VRAModulesColumns";
import VRAModulesConstants from "../../../constants/VRAModulesConstants";
import { IVRAModule, TVRADialogAddEditAction } from "@/@types/VRA.types";
import { VRAContext } from "@/store/VRAContext";
import { Plus } from "lucide-react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";

const DisplayDefault = ({
  module,
  dispatchDialogAddEdit,
}: {
  module: IVRAModule<any>;
  dispatchDialogAddEdit: React.Dispatch<TVRADialogAddEditAction>;
}) => {
  const { state } = useContext(VRAContext);
  const { currentModule } = state.menu;
  const moduleConstants = VRAModulesConstants[currentModule]?.texts.DATA_TABLE;

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
    <Card className={"border-none bg-default-50 rounded-xl"}>
      <CardHeader className={"p-4 flex-row items-center justify-between"}>
        <div className={"flex gap-2 items-center"}>
          <h1 className={"text-xl text-white"}>{moduleConstants?.title}</h1>
          <p className={"!mt-0 text-md"}>{moduleConstants?.description}</p>
        </div>
        <Button
          className={"bg-primary text-foreground"}
          onClick={() => {
            dispatchDialogAddEdit({ type: "OPEN" });
            dispatchDialogAddEdit({ type: "SET_MODE", payload: "ADD" });
          }}
        >
          <Plus size={"1rem"} className={"me-1"} />
          {moduleConstants?.addNew}
        </Button>
      </CardHeader>
      <CardBody className={"p-4"}>
        <DataTable columns={columns} data={module.data} />
      </CardBody>
    </Card>
  );
};

export { DisplayDefault };
