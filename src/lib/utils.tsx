import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { ColumnDef, Row } from "@tanstack/react-table";
import { Button, Chip } from "@nextui-org/react";
import { DataTableColumnHeader } from "@/components/ui/data-table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IVRAField } from "@/@types/VRA.types";
import moment from "moment";

export const getVRAModulesColumns = (
  fields: Partial<Record<string, IVRAField>>,
  {
    onEditRow,
  }: {
    onEditRow: ({ row }: { row: Row<any> }) => void;
  },
): ColumnDef<any>[] => {
  return [
    {
      id: "actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onSelect={() => onEditRow({ row })}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...Object.entries(fields)
      .filter(([_, field]) => !field?.primary)
      .map(([key, field]) => {
        return {
          accessorKey: key,
          header: ({ column }) => (
            <DataTableColumnHeader
              column={column}
              title={field?.label || key}
            />
          ),
          cell: ({ row }) => {
            return (
              <div className="flex items-center space-x-2">
                {field?.type === "TAGS" ? (
                  (row.original.badges as string[]).map((badge, index) => (
                    <Chip key={index} size="sm" variant="flat">
                      {badge}
                    </Chip>
                  ))
                ) : (
                  <span className="max-w-[500px] truncate font-medium">
                    {field?.type === "DATE"
                      ? moment(row.getValue(key)).format("DD-MM-YYYY")
                      : row.getValue(key)}
                  </span>
                )}
              </div>
            );
          },
        } as ColumnDef<any>;
      }),
  ] as ColumnDef<any>[];
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
