import React from "react";
import {
  IVRADialogAddEditState,
  IVRAModule,
  TVRADialogAddEditAction,
} from "@/@types/VRA.types";
import { Input } from "../ui/input";
import {Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader} from "@nextui-org/react";

const DialogAddEdit = ({
  dispatchDialogAddEdit,
  dialogAddEditState,
  module,
}: {
  dispatchDialogAddEdit: React.Dispatch<TVRADialogAddEditAction>;
  dialogAddEditState: IVRADialogAddEditState;
  module: IVRAModule<any>;
}) => {
  return (
    <Modal
      portalContainer={document.querySelector(".vra-portal-container")!}
      isOpen={dialogAddEditState.open}
      onOpenChange={(open) =>
        dispatchDialogAddEdit({ type: open ? "OPEN" : "CLOSE" })
      }
    >
      <ModalContent className="sm:max-w-[768px] border-neutral-700">
        {(onClose) => (
          <>
        <ModalHeader>
            {dialogAddEditState.mode === "ADD" ? "New record" : "Edit record"}
        </ModalHeader>
            <ModalBody>
        <div className="grid grid-cols-2 gap-4 py-4">
          {Object.keys(module.fields).map((field) => {
            if (module.fields[field]?.primary) return null;
            return (
              <Input
                key={field}
                placeholder={`Enter value...`}
                // onValueChange={(value) => {
                // dispatchForm({ type: "SET_USERNAME", value })
                // }}
                className={"col-span-1"}
                value={""}
                label={module.fields[field]?.label}
                required
              />
            );
          })}
        </div></ModalBody>
        <ModalFooter>
          <Button className={"rounded-full"} type="submit">
            {dialogAddEditState.mode === "ADD" ? "Accept" : "Save changes"}
          </Button>
        </ModalFooter>
        </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DialogAddEdit;
