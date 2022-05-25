import authRoute from "@modules/auth/routes";
import charityRoutes from "@modules/charity/routes";
// import votingRoutes from "@modules/voting/route";

const routes = [...authRoute, ...charityRoutes];
export default routes;
