import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import VinzeAdminPanel from "@/VinzeAdminPanel";
import { IVRAError, IVRAUserData } from "@/@types/VinzeAdminPanel.types";
import useLocalStorage from "use-local-storage";
import { useState } from "react";

const initialBlogData = [
  {
    id: 1,
    badges: ["Test1", "Test2"],
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste possimus accusamus, repudiandae sed sint incidunt!",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolor culpa totam reiciendis, consequuntur ipsam, nam, voluptas quaerat dolorem consequatur non sint quasi nisi! A sit necessitatibus aperiam repellendus at minima fuga sed odit maxime hic rem obcaecati, iste suscipit.",
    date: "2023-01-26T13:20:41.944Z",
    imageSrc:
      "https://fastly.picsum.photos/id/100/200/200.jpg?hmac=-Ffd_UnIv9DLflvK15Fq_1gRuN8t2wWU4UiuwAu4Rqs",
  },
  {
    id: 2,
    badges: [],
    title:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste possimus accusamus, repudiandae sed sint incidunt!",
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dolor culpa totam reiciendis, consequuntur ipsam, nam, voluptas quaerat dolorem consequatur non sint quasi nisi! A sit necessitatibus aperiam repellendus at minima fuga sed odit maxime hic rem obcaecati, iste suscipit.",
    date: "2023-01-28T12:21:40.944Z",
    imageSrc:
      "https://fastly.picsum.photos/id/106/200/200.jpg?hmac=buP7QPRJ18uSC5niV6HaCXgnkrp01jx5H_5w_3CUx9c",
  },
];

// const initialMediaData = [...Array(20)].map((_, index) => ({
//   id: index + 1,
//   type: "IMAGE",
//   label: "Test" + (index + 1),
//   src: "https://fastly.picsum.photos/id/106/200/200.jpg?hmac=buP7QPRJ18uSC5niV6HaCXgnkrp01jx5H_5w_3CUx9c",
// }));

const App = () => {
  const [error, setError] = useState<IVRAError | null>(null);
  const [blogData, setBlogData] = useState(initialBlogData);
  const [userData, setUserData] = useLocalStorage<IVRAUserData | null>(
    "vra-user-data",
    null,
  );

  return (
    <VinzeAdminPanel
      callbacks={{
        collection: {
          onAdd: (type, data, item) => {
            console.log("onAdd", type, data, item);
          },
          onEdit: (type, data, item, prevItem) => {
            console.log("onEdit", type, data, item, prevItem);
          },
          onDelete: (type, data, item) => {
            console.log("onDelete", type, data, item);
          },
        },
      }}
      modules={{
        BLOG: {
          data: blogData,
          fields: {
            id: { primary: true },
            title: { type: "TEXT", label: "Title" },
            badges: { type: "TAGS", label: "Badges" },
            content: { type: "TEXTAREA", label: "Content" },
            date: { type: "DATE", label: "Date" },
            imageSrc: { type: "IMAGE", label: "Image" },
          },
        },
      }}
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
    />
  );
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
