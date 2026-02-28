import { createBrowserRouter, Navigate, useParams } from "react-router";
import { Layout } from "./components/Layout";
import {
  RedirectToStudyUndergraduate,
  RedirectToStudyPostgraduate,
  RedirectStudyToUndergraduate,
} from "./components/LangRedirects";
import { HomePage } from "./pages/HomePage";
import { UndergraduatePage } from "./pages/UndergraduatePage";
import { PostgraduatePage } from "./pages/PostgraduatePage";
import { ProspectiveStudentsPage } from "./pages/ProspectiveStudentsPage";
import { PeoplePage } from "./pages/PeoplePage";
import { ProfileDetailPage } from "./pages/ProfileDetailPage";
import { ResearchPage } from "./pages/ResearchPage";
import { NewsPage } from "./pages/NewsPage";
import { NewsReaderPage } from "./pages/NewsReaderPage";
import { EventsPage } from "./pages/EventsPage";
import { CoursesPage } from "./pages/CoursesPage";
import { ResourcesPage } from "./pages/ResourcesPage";
import { ContactPage } from "./pages/ContactPage";
import { BridgingCoursePage } from "./pages/BridgingCoursePage";
import { LinksPage } from "./pages/LinksPage";
import { InstituteAppliedCSPage } from "./pages/InstituteAppliedCSPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { RouteErrorPage } from "./pages/RouteErrorPage";

/** Redirects /:lang/links to /:lang/resources/links (Links moved under Resources). */
function RedirectLinksToResources() {
  const { lang } = useParams<{ lang: string }>();
  return <Navigate to={`/${lang ?? "en"}/resources/links`} replace />;
}

export const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/en" replace /> },
  {
    path: "/:lang",
    Component: Layout,
    errorElement: <RouteErrorPage />,
    children: [
      { index: true, Component: HomePage },
      { path: "study", element: <RedirectStudyToUndergraduate /> },
      { path: "study/undergraduate", Component: UndergraduatePage },
      { path: "study/postgraduate", Component: PostgraduatePage },
      { path: "study/postgraduate/prospective-students", Component: ProspectiveStudentsPage },
      { path: "undergraduate", element: <RedirectToStudyUndergraduate /> },
      { path: "postgraduate", element: <RedirectToStudyPostgraduate /> },
      { path: "people", Component: PeoplePage },
      { path: "people/:slug", Component: ProfileDetailPage },
      { path: "research", Component: ResearchPage },
      { path: "news", Component: NewsPage },
      { path: "news/read", Component: NewsReaderPage },
      { path: "events", Component: EventsPage },
      { path: "courses", Component: CoursesPage },
      { path: "resources", Component: ResourcesPage },
      { path: "resources/links", Component: LinksPage },
      { path: "contact", Component: ContactPage },
      { path: "bridging", Component: BridgingCoursePage },
      { path: "links", element: <RedirectLinksToResources /> },
      { path: "institute/applied-computer-science", Component: InstituteAppliedCSPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
]);
