/*!

=========================================================
* PathMaker DashBoard React
=========================================================

*/
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Squadriglie from "views/examples/Squadriglie.js";
import Squad from "views/examples/Squad.js";
import EG from "views/examples/Eg.js";
import Utils from "views/examples/Utils.js";
import ForgotPassword from "views/examples/ForgotPassword.js"
import ConfirmRegistration from "views/examples/ConfirmRegistration.js"

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Index,
    layout: "/admin"
  },
  {
    path: "/utils",
    name: "Utils",
    icon: "ni ni-money-coins text-blue",
    component: Utils,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: Profile,
    layout: "/admin"
  },
  {
    path: "/squadriglie",
    name: "Squadriglie",
    icon: "ni ni-atom text-red",
    component: Squadriglie,
    layout: "/admin"
  },

  //SQUAD AND RAGAZZO ROUTES, DISABLED IN NAVBAR/SIDEBAR
  {
    path: "/squadriglia",
    name: "Squadriglia",
    icon: "ni ni-bullet-list-67 text-red",
    component: Squad,
    layout: "/admin"
  },
  {
    path: "/eg",
    name: "Eg",
    icon: "ni ni-bullet-list-67 text-red",
    component: EG,
    layout: "/admin"
  },

  //SIDEBAR AND NAVBAR DISABLED ROUTES (WHEN LOGGED IN)
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth" 
  },
  {
    path: "/forgot_password",
    name: "Forgot Password",
    icon: "ni ni-circle-08 text-pink",
    component: ForgotPassword,
    layout: "/auth" 
  },
  {
    path: "/confirm_registration",
    name: "Confirm Registration",
    icon: "ni ni-circle-08 text-pink",
    component: ConfirmRegistration,
    layout: "/auth"
  }
];
export default routes;
