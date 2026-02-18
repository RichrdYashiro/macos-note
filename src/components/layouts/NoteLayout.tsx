import { Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorBoundary from "../common/ErrorBoundary";
const Sidebar = lazy(() => import("../notes/Sidebar"));

function NoteLayout() {
  return (
    <div className="Notes">
      <div className="Notes__wrapper">
        <Suspense fallback={<div>Loading...</div>}>
          <Sidebar />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <ErrorBoundary>
            <Outlet />
          </ErrorBoundary>
        </Suspense>
      </div>
    </div>
  );
}

export default NoteLayout;
