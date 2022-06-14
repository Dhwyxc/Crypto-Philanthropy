import authRoute from "@modules/auth/routes";
import charityRoutes from "@modules/charity/routes";
import projectRoutes from "@modules/project/routes";
// import votingRoutes from "@modules/voting/route";

const routes = [...authRoute, ...charityRoutes, ...projectRoutes];
export default routes;
