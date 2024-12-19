import React, { useContext, useMemo } from "react";
import { IVRAModule, TRecordDialogAction } from "@/types/VRA.types.ts";
import { VRAContext } from "@/store/VRAContext.tsx";
import { ChevronDown, Plus } from "lucide-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
} from "@nextui-org/react";
import { DotsVertical, SearchMd } from "@untitled-ui/icons-react";
import {Input} from "@/components/ui/input.tsx";
import TextEditor from "@/components/text_editor/TextEditor.tsx";

const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "Paused", uid: "paused" },
  { name: "Vacation", uid: "vacation" },
];

const TableView = ({ module }: { module: IVRAModule<any> }) => {
  const { state, dispatchRecordDialog } = useContext(VRAContext);
  const { currentModule } = state.menu;

  const columns = useMemo(
    () =>
      Object.keys(module.fields).map((fieldKey) => {
        const field = module.fields[fieldKey]!;
        return {
          uid: fieldKey,
          ...field,
        };
      }),
    [module.fields],
  );

  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([]),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(columns.map((column) => column.uid)),
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>(
    {},
  );

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [columns, visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filtered = [...module.data];

    if (hasSearchFilter) {
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filtered = filtered.filter((item) =>
        Array.from(statusFilter).includes(item.status),
      );
    }

    return filtered;
  }, [filterValue, hasSearchFilter, module.data, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: any, b: any) => {
      if (!sortDescriptor.column) return 0;

      const first = a[sortDescriptor.column] as number;
      const second = b[sortDescriptor.column] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (item: any, columnKey: React.Key) => {
      const cellValue = item[columnKey as string];

      switch (columns.find((column) => columnKey === column.uid)?.type) {
        // case "DATE":
        //   return (
        //     <div className="flex flex-col">
        //       <p className="text-bold text-small capitalize">{cellValue}</p>
        //       <p className="text-bold text-tiny capitalize text-default-400">
        //         {item.team}
        //       </p>
        //     </div>
        //   );
        // case "TAGS":
        //   return (
        //     <Chip
        //       className="capitalize"
        //       color={statusColorMap[item.status]}
        //       size="sm"
        //       variant="flat"
        //     >
        //       {cellValue}
        //     </Chip>
        //   );
        // case "IMAGE":
        //   return (
        //     <div className="relative flex justify-end items-center gap-2">
        //       <Dropdown>
        //         <DropdownTrigger>
        //           <Button isIconOnly size="sm" variant="light">
        //             <DotsVertical className="text-default-300" />
        //           </Button>
        //         </DropdownTrigger>
        //         <DropdownMenu>
        //           <DropdownItem>View</DropdownItem>
        //           <DropdownItem>Edit</DropdownItem>
        //           <DropdownItem>Delete</DropdownItem>
        //         </DropdownMenu>
        //       </Dropdown>
        //     </div>
        //   );
        case "RICH_TEXT":
          return (
            <div dangerouslySetInnerHTML={{ __html: cellValue.replaceAll("<script", "") }} />
          );
        case "IMAGE":
          return (
            <div className="flex justify-center items-center">
              <img
                src={cellValue}
                alt={item.name}
                className="w-8 h-8 rounded-full"
              />
            </div>
          );
        case "DATE":
          return (
            <p className="text-small text-default-400">
              {new Date(cellValue).toLocaleDateString()}
            </p>
          );
        default:
          return cellValue;
      }
    },
    [columns],
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchMd />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown
              portalContainer={document.querySelector(".vra-portal-container")!}
            >
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDown className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={setStatusFilter}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.uid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown
              portalContainer={document.querySelector(".vra-portal-container")!}
            >
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDown className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Button
              color="primary"
              endContent={<Plus />}
              onClick={() => {
                dispatchRecordDialog({ type: "OPEN" });
              }}
            >
              New record
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {module.data.length} items
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, statusFilter, visibleColumns, columns, module.data.length, onRowsPerPageChange, onClear, dispatchRecordDialog]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    filteredItems.length,
    page,
    pages,
    onPreviousPage,
    onNextPage,
  ]);

  return (
    <>
      {/*<div className={"flex gap-2 items-center"}>*/}
      {/*  <h1 className={"text-xl text-white"}>*/}
      {/*    {module.config.friendlyName || "Collection"}*/}
      {/*  </h1>*/}
      {/*</div>*/}
      {/*<Button*/}
      {/*  className={"bg-primary text-foreground"}*/}
      {/*  onClick={() => {*/}
      {/*    dispatchDialogAddEdit({ type: "OPEN" });*/}
      {/*    dispatchDialogAddEdit({ type: "SET_MODE", payload: "ADD" });*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Plus size={"1rem"} className={"me-1"} />*/}
      {/*  New record*/}
      {/*</Button>*/}
      <Table
        aria-label="Collection Table"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.label}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"No results found"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export { TableView };
