import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import ShikharPage from "./pages/ShikharPage";
import TrekEstimatorPage from "./pages/TrekEstimatorPage";

export default function App() {
  return (
    <>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<TrekEstimatorPage />} />
        <Route path="/test" element={<ShikharPage />} />
      </Routes>
    </>
  );
}
