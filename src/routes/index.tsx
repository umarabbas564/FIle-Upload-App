import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import MainLayout from "layouts/MainLayout";
import UploadView from "views/UploadView";
import FilesListView from "views/FilesListView";

const routes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout children={<Outlet />} />}>
          <Route path="/" element={<Navigate to="/upload" />} />
          <Route path="/upload" element={<UploadView />} />
          <Route path="/filesList" element={<FilesListView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default routes;
