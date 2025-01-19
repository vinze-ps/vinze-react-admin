import { StrictMode, useMemo } from "react";
import { createRoot } from "react-dom/client";
import VinzeReactAdmin from "@/components/VinzeReactAdmin.tsx";
import {
  IVRAError,
  IVRAModuleCallbacks,
  IVRAUserData,
} from "@/types/VRA.types.ts";
import useLocalStorage from "use-local-storage";
import { useState } from "react";
import VRAModule from "@/components/VRAModule.tsx";
import { initialBlogData } from "@/tests/dummy_data.ts";

const App = () => {
  const [error, setError] = useState<IVRAError | null>(null);
  const [blogData, setBlogData] = useState(initialBlogData);
  const [userData, setUserData] = useLocalStorage<IVRAUserData | null>(
    "vra-user-data",
    null,
  );

  return (
    <VinzeReactAdmin
      config={{ companyName: "Testowa" }}
      auth={{
        userData,
        error,
        google: true,
        onSubmit: async (type, data) => {
          setTimeout(() => setUserData({ name: data.username }), 1000);
          return { status: true };
        },
        onLogout: () => setUserData(null),
      }}
    >
      <VRAModule
        config={{
          name: "BLOG",
          friendlyName: "Blog",
        }}
        callbacks={
          useMemo(
            () => ({
              onAdd: (data, item) => {
                console.log("onAdd", data, item);
                setBlogData([...data, item]);
              },
              onEdit: (data, item, prevItem) => {
                console.log("onEdit", data, item, prevItem);
                setBlogData(data.map((i) => (i.id === item.id ? item : i)));
              },
              onDelete: (data, item) => {
                console.log("onDelete", data, item);
                setBlogData(data.filter((i) => i.id !== item.id));
              },
            }),
            [],
          ) as IVRAModuleCallbacks<(typeof blogData)[0]>
        }
        data={useMemo(() => blogData, [blogData]) as typeof blogData}
        fields={useMemo(
          () => ({
            id: { primary: true },
            title: { type: "TEXT", label: "Title" },
            badges: { type: "TAGS", label: "Badges" },
            content: { type: "RICH_TEXT", label: "Content" },
            date: { type: "DATE", label: "Date" },
            imageSrc: { type: "IMAGE", label: "Image" },
          }),
          [],
        )}
      />
    </VinzeReactAdmin>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
