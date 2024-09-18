import { useContext, useMemo } from "react";
import { IVRA } from "@/@types/VRA.types";
import Logo from "@/assets/logo.svg";
import {
  Dropdown,
  DropdownMenu,
  DropdownTrigger,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { VRAContext } from "@/store/VRAContext";
import { cn } from "@/lib/utils";
import {Database02, LogOut01} from "@untitled-ui/icons-react";

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
        className: `${currentModule === module.config.name ? "bg-default text-[var(--vra-text-primary)]" : ""}`,
        onClick: () =>
          dispatchVRA({ type: "SET_CURRENT_MODULE", payload: module.config.name }),
      })),
    [dispatchVRA, modules, currentModule],
  );

  return (
    <div className="w-full max-w-[200px] p-3 items-center text-[var(--vra-text-primary)] flex flex-col justify-between h-full border-[var(--vra-background-tertiary)] bg-default-50 flex-shrink-0">
      <div className="h-full w-full flex flex-col justify-start">
        <div className={"p-3"}>
          <img src={Logo} alt="logo" className="w-[4rem] h-auto" />
        </div>
        <Listbox
          aria-label="Menu"
          items={listItems}
          selectionMode="single"
          hideSelectedIcon
          selectedKeys={[currentModule]}
          className={"mt-4"}
        >
          {(listItem) => (
            <ListboxItem
              key={listItem.config.name}
              textValue={listItem.config.name}
              onClick={listItem.onClick}
              className={cn(
                `text-[var(--vra-text-tertiary)]`,
                listItem.className,
              )}
              classNames={{
                title: "text-[0.75rem]",
              }}
              startContent={listItem.config.icon || <Database02 width={16} height={16} />}
            >
              {listItem.config.friendlyName || `Collection ${listItem.index + 1}`}
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
                    "rounded-[2rem] p-[0.5rem] bg-purple-500 w-[2.15rem] h-[2.15rem] mr-[0.5rem] flex items-center justify-center"
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
                startContent={
                  <LogOut01 width={16} height={16} />
                }
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
