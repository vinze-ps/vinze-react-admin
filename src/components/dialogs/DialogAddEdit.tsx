import React from "react";
import {
  IVRADialogAddEditState,
  IVRAModule,
  TVRADialogAddEditAction,
} from "@/@types/VinzeAdminPanel.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import {Button} from "@nextui-org/react";

const DialogAddEdit = ({
  dispatchDialogAddEdit,
  dialogAddEditState,
  currentModule,
}: {
  dispatchDialogAddEdit: React.Dispatch<TVRADialogAddEditAction>;
  dialogAddEditState: IVRADialogAddEditState;
  currentModule: IVRAModule;
}) => {
  return (
    <Dialog
      open={dialogAddEditState.open}
      onOpenChange={(open) =>
        dispatchDialogAddEdit({ type: open ? "OPEN" : "CLOSE" })
      }
    >
      <DialogContent className="sm:max-w-[768px] border-neutral-700">
        <DialogHeader>
          <DialogTitle>
            {dialogAddEditState.mode === "ADD" ? "Add" : "Edit"}
          </DialogTitle>
          <DialogDescription>
            {dialogAddEditState.mode === "ADD"
              ? "In this place you can add a new item."
              : "You're currently editing an existing item."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {Object.keys(currentModule.fields).map((field) => {
            if (currentModule.fields[field]?.primary) return null;
            return (
              <Input
                key={field}
                placeholder={`Enter ${currentModule.fields[field]?.label}...`}
                // onValueChange={(value) => {
                  // dispatchForm({ type: "SET_USERNAME", value })
                // }}
                className={"col-span-1"}
                value={""}
                label={currentModule.fields[field]?.label}
                required
              />
            );
          })}
        </div>
        <DialogFooter>
          <Button className={"rounded-full"} size={"sm"} type="submit">
            {dialogAddEditState.mode === "ADD" ? "Add new" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogAddEdit;
