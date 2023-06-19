import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages
import Search from "./components/Search";
import TableWithDetails from "./components/table/TableWithDetails";
import Breadcrumbs from "./components/Breadcrumbs";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Breadcrumbs />
        <Routes>
          <Route index element={<Navigate to="/search" />} />
          <Route path="/search" element={<Search />} />
          <Route path="/error" element={<NotFound />} />
          <Route path="/search/:author/*" element={<TableWithDetails />} />
          <Route path="/search/:author" element={<Navigate to="1" replace />} />
          <Route
            path="/search/:author/:pageId/"
            element={<TableWithDetails />}
          />
          <Route
            path="/search/:author/:pageId/:bookId"
            element={<TableWithDetails />}
          />
          <Route
            path="/search/:author/:pageId/:bookId/*"
            element={<Navigate to="/error" />}
          />
          <Route path="*" element={<Navigate to="/error" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
