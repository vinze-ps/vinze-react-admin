import React from "react";
// import { IVRAProps } from "@/@types/VinzeAdminPanel.types";
// import IonIconCustom from "@/components/IonIconCustom/IonIconCustom";
// import { VRAContext } from "@/store/VRAContext";

const Media = ({
  style,
  // onMediaClick,
}: {
  style?: React.CSSProperties;
  onMediaClick?: (mediaItem: any) => void;
}) => {
  // const { modules }: IVRAProps = useContext(VRAContext).state.VRAProps;
  // const config: IVRAModuleConfig<IVRAModuleMediaConfigOptions> = cards.find(
  //   (module) => module.name === "MEDIA"
  // )!.config;
  // const { data }: { data: IVRAMediaItem[] } = config;

  return (
    <>
      <div className={"flex-1"} style={style}>
        {/* <Button style={{ margin: "0 0 1rem 0" }} variant="contained">
          <IonIconCustom name="add-outline" style={{ margin: "0 0.5rem 0 0" }} />
          Dodaj
        </Button> */}
        {/* <div className={styles["images"]}>
          {data.length > 0 ? (
            data.map(
              (item, index) =>
                item.type === "IMAGE" && (
                  <div key={index} className={styles["image-container"]}>
                    <figure onClick={() => onMediaClick && onMediaClick(item)}>
                      <img src={item.src} alt="Media item" />
                      <figcaption>{item.label}</figcaption>
                    </figure>
                  </div>
                )
            )
          ) : (
            <div>Brak mediów.</div>
          )}
        </div> */}
      </div>
    </>
  );
};

export default Media;
