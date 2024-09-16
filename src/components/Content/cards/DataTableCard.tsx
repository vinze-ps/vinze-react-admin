import React, { useContext, useMemo } from "react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Card,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { getVRAModulesColumns } from "@/constants/VRAModulesColumns";
import VRAModulesConstants from "../../../constants/VRAModulesConstants";
import {
  IVRAModule,
  TVRADialogAddEditAction,
} from "@/@types/VinzeAdminPanel.types";
import { VRAContext } from "@/store/VRAContext";
import { Plus } from "lucide-react";
import {Button} from "@nextui-org/react";

const DisplayDefault = ({
  currentModule,
  dispatchDialogAddEdit,
}: {
  currentModule: IVRAModule;
  dispatchDialogAddEdit: React.Dispatch<TVRADialogAddEditAction>;
}) => {
  const { state } = useContext(VRAContext);
  const { currentModuleType } = state.menu;
  const moduleConstants =
    VRAModulesConstants[currentModuleType]?.texts.DATA_TABLE;

  const columns = useMemo(
    () =>
      getVRAModulesColumns(currentModule.fields, {
        onEditRow: ({ row }) => {
          dispatchDialogAddEdit({ type: "OPEN" });
          dispatchDialogAddEdit({ type: "SET_MODE", payload: "EDIT" });
          console.log(row.original);
        },
      }),
    [currentModule.data, dispatchDialogAddEdit],
  );

  return (
    <Card className={"border-none bg-default-50 rounded-xl"}>
      <CardHeader className={"p-4 flex-row items-center justify-between"}>
        <div className={"flex gap-2 items-center"}>
          <CardTitle className={"text-xl text-white"}>
            {moduleConstants?.title}
          </CardTitle>
          <CardDescription className={"!mt-0 text-md"}>
            {moduleConstants?.description}
          </CardDescription>
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
      <CardContent className={"p-4"}>
        <DataTable columns={columns} data={currentModule.data} />
      </CardContent>
    </Card>
  );
};

export { DisplayDefault };
