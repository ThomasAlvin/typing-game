import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import TestPage from "../pages/TestPage";

const routes = [
  <Route key={"HomePage"} path="/" element={<HomePage />}></Route>,
  <Route key={"TestPage"} path="/test" element={<TestPage />}></Route>,
];
export default routes;
