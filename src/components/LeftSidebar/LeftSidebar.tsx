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
import VRAModulesConstants from "@/constants/VRAModulesConstants";
import { cn } from "@/lib/utils";

const LeftSidebar = () => {
  const { state, dispatchVRA } = useContext(VRAContext);
  const { auth }: IVRA = state.VRAProps!;
  const { onLogout, userData } = auth;
  const { menu, modules } = state;
  const { currentModule } = menu;
  const listItems = useMemo(
    () =>
      modules.map((module) => ({
        ...module,
        className: `${currentModule === module.name ? "bg-default text-[var(--vra-text-primary)]" : ""}`,
        onClick: () =>
          dispatchVRA({ type: "SET_CURRENT_MODULE", payload: module.name }),
      })),
    [dispatchVRA, modules, currentModule],
  );

  console.log(modules);

  return (
    <div className="w-full max-w-[200px] p-3 items-center text-[var(--vra-text-primary)] flex flex-col justify-between h-full rounded-xl border-[var(--vra-background-tertiary)] bg-default-50 flex-shrink-0">
      <div className="h-full w-full flex flex-col justify-start">
        {/* <TabContext value={currentCategory}>
          <Box
            sx={{
              marginBottom: "1rem",
              backgroundColor: "var(--vra-background-secondary)",
              borderRadius: "0.5rem",
              overflow: "hidden",
              padding: "0.25rem",

              "& .MuiTabs-root": {
                minHeight: "unset !important",
              },

              "& .MuiTab-root": {
                color: "var(--vra-text-primary)",
                zIndex: 1,
                borderRadius: "0px !important",
                padding: "0.5rem 0",
                minHeight: "unset !important",
                textTransform: "none",

                "&.Mui-disabled": {
                  color: "var(--vra-text-quaternary)",
                },
              },

              "& .MuiTabs-indicator": {
                height: "100%",
                backgroundColor: "var(--vra-background-tertiary)",
                minHeight: "unset !important",
                borderRadius: "0.35rem",
              },
            }}
          >
            <TabList
              onChange={(_, value) =>
                dispatchVRA(
                  appActions.setStateBasic({
                    keyName: "menu",
                    value: { currentCategory: value },
                    saveToLocalStorage: ["currentCategory"],
                  })
                )
              }
              aria-label="lab API tabs example"
            >
              <Tab sx={{ width: "50%" }} label="Zarządzanie" value="" />
              <Tab disabled sx={{ width: "50%" }} label="Moja strona" value="TEST" />
            </TabList>
          </Box>
        </TabContext> */}
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
              key={listItem.name}
              textValue={listItem.name}
              onClick={listItem.onClick}
              className={cn(
                `text-[var(--vra-text-tertiary)]`,
                listItem.className,
              )}
              classNames={{
                title: "text-xs",
              }}
              startContent={VRAModulesConstants[listItem.name]?.navigation.icon}
            >
              {VRAModulesConstants[listItem.name]?.navigation.text}
            </ListboxItem>
          )}
        </Listbox>
        <div className="mt-auto">
          <Dropdown
            portalContainer={document.querySelector(".vra-portal-container")!}
          >
            <DropdownTrigger>
              <div
                className={`hover:bg-default cursor-pointer rounded-lg w-full mb-[1rem] flex items-center px-[1rem] py-[0.25rem]`}
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
                // startContent={
                //   <IonIconCustom
                //     size="small"
                //     name="log-out-outline"
                //     color="var(--vra-red)"
                //   />
                // }
                onClick={onLogout}
                key="Logout"
                className="text-danger"
                color="danger"
              >
                Logout
              </ListboxItem>
            </DropdownMenu>
          </Dropdown>
          {/*<div className="text-xs text-[var(--vra-text-quaternary)] ps-[1rem] pb-[0.5rem]">*/}
          {/*  version {packageJson.version}*/}
          {/*</div>*/}
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;
