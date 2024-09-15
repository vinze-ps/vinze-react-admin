
// import objectHelpers from "../../../../utils/objectHelpers";
// import { IVRAProps } from "@/@types/VinzeAdminPanel.types";
// import IonIconCustom from "../../../../components/IonIconCustom/IonIconCustom";
// import { VRAContext } from "@/store/VRAContext";

const LastBlog = ({
  // getPostItem,
}: {
  getPostItem: (p: any, index: number) => JSX.Element;
}) => {
  // const { modules }: IVRAProps = useContext(VRAContext).state.VRAProps;
  // const config: IVRAModuleConfig<IVRAModuleBlogConfigOptions> | undefined = cards.find(
  //   (m) => m.name === "BLOG"
  // )?.config;
  // const data: IVRAPost[] | undefined = config?.data;

  return (
    <div style={{ gridColumn: "span 6", gridRow: "span 5" }}>
      <h1>
        Latest blog{" "}
        {/*<IonIconCustom*/}
        {/*  size="large"*/}
        {/*  name="megaphone-outline"*/}
        {/*  style={{ marginLeft: "0.5rem" }}*/}
        {/*/>*/}
      </h1>
      <div>
        {/* {data &&
          data
            .sort((a, b) => -1 * objectHelpers.sortTypeDate(a.date, b.date))
            .map(getPostItem)
            .slice(0, 2)} */}
      </div>
    </div>
  );
};

export default LastBlog;
