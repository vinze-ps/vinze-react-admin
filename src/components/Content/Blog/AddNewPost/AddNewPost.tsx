import React from "react";
// import { useSnackbar } from "notistack";
// import { IVRAProps } from "@/@types/VinzeAdminPanel.types";
// import SunEditor from "suneditor-react";
// import dayjs, { Dayjs } from "dayjs";
// import { useEditorOptions } from "@/hooks/use-editor-options";
// import Media from "../../Media/Media";
// import { VRAContext } from "@/store/VRAContext";

// interface IPostDataActions {
//   value: any;
//   type: "SET_TITLE" | "SET_CONTENT" | "SET_AUTHOR" | "SET_DATE";
// }

const AddNewPost = React.memo(() => {
  // const editorOptions = useEditorOptions();
  // const { modules }: IVRAProps = useContext(VRAContext).state.VRAProps;
  // const config: IVRAModuleConfig<IVRAModuleBlogConfigOptions> | undefined = cards.find(
  //   (m) => m.name === "BLOG"
  // )?.config;
  // const { enqueueSnackbar } = useSnackbar();
  // const [showImageSelectModal, setShowImageSelectModal] =
  //   useState<boolean>(false);

  // const [formState, dispatchForm] = useReducer(
  //   (state: IVRAPost, action: IPostDataActions) => {
  //     switch (action.type) {
  //       case "SET_TITLE":
  //         return { ...state, title: action.value };
  //       case "SET_CONTENT":
  //         return { ...state, content: action.value };
  //       case "SET_AUTHOR":
  //         return { ...state, author: action.value };
  //       case "SET_DATE":
  //         return { ...state, date: action.value };
  //       default:
  //         return { ...state };
  //     }
  //   },
  //   {
  //     title: "",
  //     content: "",
  //     date: new Date().toISOString(),
  //     author: "",
  //   }
  // );

  return (
    <>
      {/* <Dialog onClose={() => setShowImageSelectModal(false)} fullWidth maxWidth="md" open={showImageSelectModal}>
        <DialogTitle marginBottom="2rem">Wybierz zdjęcie</DialogTitle>
        <DialogContent>
          <Media
            onMediaClick={(mediaItem) => {
              console.log(mediaItem);
              setShowImageSelectModal(false);
            }}
          />
        </DialogContent>
      </Dialog> */}
      <div style={{ gridColumn: "span 12", gridRow: "span 8" }}>
        <h1>
          Dodaj post
          {/*<IonIconCustom name="add-outline" />*/}
        </h1>
        {/* <Button
          variant="contained"
          style={{ textTransform: "none", margin: "0.5rem 0 0 0" }}
          onClick={() => setShowImageSelectModal(true)}
        >
          <IonIconCustom name="image-outline" style={{ margin: "0 0.5rem 0 0 " }} />
          Wybierz zdjęcie...
        </Button>
        <Stack margin="1rem 0" direction="row" spacing="1rem" width="100%">
          <TextField
            value={formState.title}
            onChange={(e) => dispatchForm({ type: "SET_TITLE", value: e.target.value })}
            style={{ flex: "0 0 50%" }}
            className={styles["input"]}
            variant="outlined"
            label="Tytuł"
            size="small"
          />
          <TextField
            value={formState.author}
            onChange={(e) => dispatchForm({ type: "SET_AUTHOR", value: e.target.value })}
            className={styles["input"]}
            variant="outlined"
            label="Autor"
            size="small"
          />
          <DateTimePicker
            value={dayjs(formState.date)}
            onChange={(value: Dayjs | null) => dispatchForm({ type: "SET_DATE", value: value?.toISOString() })}
            disableFuture
            label="Data"
            openTo="year"
            views={["year", "month", "day", "hours", "minutes"]}
            // renderInput={(params: any) => (
            //   <TextField
            //     {...params}
            //     className={styles["input"]}
            //     variant="outlined"
            //     label="Data"
            //     size="small"
            //     type="date"
            //   />
            // )}
          />
        </Stack> */}
        {/* {editorOptions && (
          <SunEditor
            onChange={(value) => dispatchForm({ type: "SET_CONTENT", value })}
            defaultValue={formState.content}
            setOptions={editorOptions}
            placeholder="Treść..."
            name="post-add"
            lang="pl"
          />
        )} */}
        {/* <Button
          onClick={async () => {
            if (config?.handleAdd) {
              const result = await config.handleAdd(formState);
              enqueueSnackbar(result.message, { variant: result.success ? "success" : "error" });
            }
          }}
          type="submit"
          variant="contained"
        >
          Dodaj
        </Button> */}
      </div>
    </>
  );
});

AddNewPost.displayName = "AddNewPost";

export default AddNewPost;
