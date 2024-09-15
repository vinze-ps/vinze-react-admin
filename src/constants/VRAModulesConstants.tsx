import {
  BellDot,
  ClipboardPenLine,
  GalleryVerticalEnd,
  Gauge,
  MessagesSquare,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import { TVRAModuleConstants } from "@/@types/VinzeAdminPanel.types";

const VRAModulesConstants: TVRAModuleConstants = {
  DASHBOARD: {
    navigation: {
      icon: <Gauge size={"0.9rem"} />,
      text: "Dashboard",
      path: "/dashboard",
    },
    texts: {},
  },
  NOTIFICATIONS: {
    navigation: {
      icon: <BellDot size={"0.9rem"} />,
      text: "Notifications",
      path: "/notifications",
    },
    texts: {},
  },
  USERS: {
    navigation: {
      icon: <Users size={"0.9rem"} />,
      text: "Users",
      path: "/users",
    },
    texts: {},
  },
  SHOP: {
    navigation: {
      icon: <ShoppingBag size={"0.9rem"} />,
      text: "Shop",
      path: "/shop",
    },
    texts: {},
  },
  BLOG: {
    navigation: {
      icon: <ClipboardPenLine size={"0.9rem"} />,
      text: "Blog",
      path: "/blog",
    },
    texts: {
      DATA_TABLE: {
        title: "Posts",
        description: "That were added earlier.",
        addNew: "Add new post",
      },
      ADD: {
        title: "Add post",
        description: "Fill in the fields below to add a new post.",
      },
      EDIT: {
        title: "Edit post",
        description: "Fill in the fields below to edit the post.",
      },
      DELETE: {
        title: "Delete post",
        description: "Are you sure you want to delete the post?",
      },
    },
  },
  MEDIA: {
    navigation: {
      icon: <GalleryVerticalEnd size={"0.9rem"} />,
      text: "Media",
      path: "/media",
    },
    texts: {},
  },
  COMMENTS: {
    navigation: {
      icon: <MessagesSquare size={"0.9rem"} />,
      text: "Comments",
      path: "/comments",
    },
    texts: {},
  },
  SETTINGS: {
    navigation: {
      icon: <Settings size={"0.9rem"} />,
      text: "Settings",
      path: "/settings",
    },
    texts: {},
  },
};

export default VRAModulesConstants;
