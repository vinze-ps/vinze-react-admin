// import { IVRAProps } from "@/@types/VinzeAdminPanel.types";
// import timeHelpers from "../../../../utils/timeHelpers";
// import { search } from "@/utils/search";
// import { VRAContext } from "@/store/VRAContext";

const SearchPost = ({
  // getPostItem,
}: {
  getPostItem: (p: any, index: number) => JSX.Element;
}) => {
  // const { modules }: IVRAProps = useContext(VRAContext).state.VRAProps;
  // const config: IVRAModuleConfig<IVRAModuleBlogConfigOptions> | undefined = cards.find(
  //   (m) => m.name === "BLOG"
  // )?.config;
  // const data: IVRAPost[] | undefined = config?.data;
  // const [searchValue, setSearchValue] = useState<string | null>(null);
  // const [searchLoading, setSearchLoading] = useState<boolean>(false);
  // const [searchResults, setSearchResults] = useState<any[]>([]);

  // useEffect(() => {
  //   if (!data) return;
  //   if (searchValue) setSearchLoading(true);

  //   const timeout = setTimeout(() => {
  //     setSearchResults(
  //       searchValue === null
  //         ? []
  //         : search(
  //             searchValue,
  //             data.map((p) => ({ ...p, date_formated: timeHelpers.fromISOToDateFormat(p.date) })),
  //             "post",
  //             null
  //           ).map((r) => r.data)
  //     );
  //     setSearchLoading(false);
  //   }, 1000);

  //   return () => clearTimeout(timeout);
  // }, [data, searchValue]);

  return (
    <div style={{ gridColumn: "span 6", gridRow: "span 5" }}>
      <h1>
        Wyszukaj post{" "}
        {/*<IonIconCustom*/}
        {/*  name="search-outline"*/}
        {/*  size="large"*/}
        {/*  style={{ marginLeft: "0.5rem" }}*/}
        {/*/>*/}
      </h1>
      {/* <FormLabel>Można wprowadzać np. słowa kluczowe, datę czy autora.</FormLabel>
      <TextField
        onChange={(e) => setSearchValue(e.target.value || null)}
        className={styles["search-input"]}
        variant="outlined"
        label="Wyszukiwana fraza..."
        size="small"
      /> */}
      {/* <div
        className={`${styles["search-results"]} ${searchResults.length > 0 && !searchLoading ? styles["found"] : ""}`}
      >
        {searchLoading ? (
          <CircularProgress />
        ) : searchResults.length === 0 ? (
          searchValue === null ? (
            <>
              Proszę wprowadzić,
              <br />
              frazę w wyszukiwarkę...
            </>
          ) : (
            <>
              <IonIconCustom name="sad-outline" style={{ margin: "0 0 0.5rem 0" }} color="var(--vra-text-quaternary)" />
              Niestety,
              <br />
              nic nie zostało znalezione...
            </>
          )
        ) : (
          <>{searchResults.map(getPostItem)}</>
        )}
      </div> */}
    </div>
  );
};

export default SearchPost;
