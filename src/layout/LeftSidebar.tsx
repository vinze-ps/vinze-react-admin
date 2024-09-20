import { useContext, useMemo } from "react";
import { IVRA } from "@/@types/VRA.types.ts";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { VRAContext } from "@/store/VRAContext.tsx";
import { cn } from "@/lib/utils.tsx";
import { Database02, LogOut01 } from "@untitled-ui/icons-react";
import { Badge } from "@/components/ui/badge.tsx";

const LeftSidebar = () => {
  const { state, dispatchVRA } = useContext(VRAContext);
  const { auth }: IVRA = state.VRAProps!;
  const { onLogout, userData } = auth;
  const { menu, modules } = state;
  const { currentModule } = menu;
  const listItems = useMemo(
    () =>
      modules.map((module, index) => ({
        ...module,
        index,
        className: `${currentModule === module.config.name ? "bg-default text-foreground" : ""}`,
        onClick: () =>
          dispatchVRA({
            type: "SET_CURRENT_MODULE",
            payload: module.config.name,
          }),
      })),
    [dispatchVRA, modules, currentModule],
  );
  const module = modules.find((m) => m.config.name === currentModule);

  return (
    <div className="w-full max-w-[240px] p-4 items-center flex flex-col justify-between h-full border-e-zinc-700 border-e-1 bg-default-50 flex-shrink-0">
      <div className="h-full w-full flex flex-col justify-start">
        <p className={"text-xs font-semibold"}>Collections</p>
        <Listbox
          aria-label="Menu"
          items={listItems}
          selectionMode="single"
          hideSelectedIcon
          selectedKeys={[currentModule]}
          className={"mt-2"}
        >
          {(listItem) => (
            <ListboxItem
              key={listItem.config.name}
              textValue={listItem.config.name}
              onClick={listItem.onClick}
              className={cn(
                `text-[var(--vra-text-tertiary)] px-3 py-1.5`,
                listItem.className,
              )}
              classNames={{
                title: "text-[0.75rem]",
              }}
              startContent={
                listItem.config.icon || <Database02 width={16} height={16} />
              }
              endContent={
                <Badge className={"!bg-zinc-700"}>
                  {module?.data?.length || 0}
                </Badge>
              }
            >
              {listItem.config.friendlyName ||
                `Collection ${listItem.index + 1}`}
            </ListboxItem>
          )}
        </Listbox>
        <div className="mt-auto">
          <Dropdown
            portalContainer={document.querySelector(".vra-portal-container")!}
          >
            <DropdownTrigger>
              <div
                className={`hover:bg-default cursor-pointer rounded-3xl w-full mb-1 flex items-center p-1`}
              >
                <div
                  className={
                    "rounded-[2rem] p-[0.5rem] bg-blue w-[2.15rem] h-[2.15rem] mr-[0.5rem] flex items-center justify-center"
                  }
                >
                  {(userData?.name || "?")[0].toUpperCase()}
                </div>
                <div className="flex flex-col items-start justify-center">
                  <span className="text-xs text-default-500">Logged as</span>
                  <span className="text-sm text-foreground">
                    {userData?.name}
                  </span>
                </div>
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="User menu">
              <ListboxItem
                startContent={<LogOut01 width={16} height={16} />}
                onClick={onLogout}
                key="Logout"
                className="text-danger"
                color="danger"
              >
                Logout
              </ListboxItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
