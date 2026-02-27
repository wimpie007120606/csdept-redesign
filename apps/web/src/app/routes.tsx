import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./pages/HomePage";
import { UndergraduatePage } from "./pages/UndergraduatePage";
import { PostgraduatePage } from "./pages/PostgraduatePage";
import { ProspectiveStudentsPage } from "./pages/ProspectiveStudentsPage";
import { PeoplePage } from "./pages/PeoplePage";
import { ProfileDetailPage } from "./pages/ProfileDetailPage";
import { ResearchPage } from "./pages/ResearchPage";
import { NewsPage } from "./pages/NewsPage";
import { EventsPage } from "./pages/EventsPage";
import { CoursesPage } from "./pages/CoursesPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { ContactPage } from "./pages/ContactPage";
import { BridgingCoursePage } from "./pages/BridgingCoursePage";
import { LinksPage } from "./pages/LinksPage";
import { InstituteAppliedCSPage } from "./pages/InstituteAppliedCSPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RouteErrorPage } from "./pages/RouteErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, Component: HomePage },
      { path: "study", element: <Navigate to="/study/undergraduate" replace /> },
      { path: "study/undergraduate", Component: UndergraduatePage },
      { path: "study/postgraduate", Component: PostgraduatePage },
      { path: "study/postgraduate/prospective-students", Component: ProspectiveStudentsPage },
      { path: "undergraduate", element: <Navigate to="/study/undergraduate" replace /> },
      { path: "postgraduate", element: <Navigate to="/study/postgraduate" replace /> },
      { path: "people", Component: PeoplePage },
      { path: "people/:slug", Component: ProfileDetailPage },
      { path: "research", Component: ResearchPage },
      { path: "news", Component: NewsPage },
      { path: "events", Component: EventsPage },
      { path: "courses", Component: CoursesPage },
      { path: "resources", Component: ResourcesPage },
      { path: "contact", Component: ContactPage },
      { path: "bridging", Component: BridgingCoursePage },
      { path: "links", Component: LinksPage },
      { path: "institute/applied-computer-science", Component: InstituteAppliedCSPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
