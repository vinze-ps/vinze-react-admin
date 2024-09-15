// import { useContext } from "react";
// import { IVRAProps } from "@/@types/VinzeAdminPanel.types";
// import { VRAContext } from "@/store/VRAContext";

export const useEditorOptions = () => {
  // const { modules }: IVRAProps = useContext(VRAContext).state.VRAProps;
  // const mediaConfig: IVRAModuleConfig<IVRAModuleMediaConfigOptions> | undefined = cards.find(
  //   (m) => m.name === "MEDIA"
  // )?.config;

  const buttonList = [
    "undo",
    "redo",
    "fontSize",
    "formatBlock",
    "paragraphStyle",
    "blockquote",
    "bold",
    "underline",
    "italic",
    "strike",
    "fontColor",
    "hiliteColor",
    "textStyle",
    "removeFormat",
    "outdent",
    "indent",
    "align",
    "horizontalRule",
    "list",
    "lineHeight",
    "table",
    "link",
    "image",
    "video",
    "fullScreen",
    "showBlocks",
    "preview",
    "print",
  ];

  // if (mediaConfig?.options?.imageGalleryUrl) buttonList.push("imageGallery");

  return {
    resizingBar: false,
    // -- RESPONSE STRUCT
    // {
    //  "statusCode": number,
    //  "result": [
    //    { "src": string, "name": string, "alt": string, "tag": string }
    //  ]
    // }
    // imageGalleryUrl: mediaConfig?.options?.imageGalleryUrl,
    buttonList: [buttonList],
  };
};
