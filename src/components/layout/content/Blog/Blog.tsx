import React from "react";
// import timeHelpers from "../../../utils/timeHelpers";
// import LastBlog from "./LastBlog/LastBlog";
// import SearchPost from "./SearchPost/SearchPost";
// import AddNewPost from "./AddNewPost/AddNewPost";
// import IonIconCustom from "../../../components/IonIconCustom/IonIconCustom";

const Blog = React.memo(() => {
  // const getPostItem = useCallback((p: any, index: number) => {
  //   return (
  //     <div key={index}>
  //       <div>
  //         {p.imageSrc ? (
  //           <img src={p.imageSrc} alt="Post" />
  //         ) : (
  //           <IonIconCustom name="image-outline" />
  //         )}
  //       </div>
  //       <div>
  //         <h4>
  //           <span
  //             style={{
  //               color: "var(--vra-text-tertiary)",
  //               fontSize: "0.8rem",
  //               fontWeight: "400",
  //             }}
  //           >
  //             {timeHelpers.fromISOToDateFormat(p.date, { time: true })}, autor{" "}
  //             {p.author || "??"}
  //           </span>
  //           <br />
  //           {p.title
  //             ? p.title.split(" ").length < 8
  //               ? p.title
  //               : `${p.title.split(" ").slice(0, 8).join(" ")}...`
  //             : "??"}
  //           {/* <Button
  //             style={{
  //               margin: "0 0 0 0.25rem",
  //               padding: "0 0.25rem",
  //               backgroundColor: "var(--vra-ultra-light-yellow)",
  //               color: "var(--black)",
  //             }}
  //             variant="contained"
  //             size="small"
  //           >
  //             <IonIconCustom name="pencil-outline" style={{ margin: "0 0.25rem 0 0" }} />
  //             Edytuj
  //           </Button> */}
  //         </h4>
  //         <p
  //           dangerouslySetInnerHTML={{
  //             __html:
  //               p.content?.split(" ").length < 15
  //                 ? p.content
  //                 : `${p.content?.split(" ").slice(0, 15).join(" ")}...`,
  //           }}
  //         ></p>
  //       </div>
  //     </div>
  //   );
  // }, []);

  return (
    <>
      {/*<LastBlog getPostItem={getPostItem} />*/}
      {/*<SearchPost getPostItem={getPostItem} />*/}
      {/*<AddNewPost />*/}
    </>
  );
});

Blog.displayName = "Blog";

export default Blog;
