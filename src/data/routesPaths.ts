export const authPaths = {
  logIn: "/auth/sign-in",
  register: "/auth/sign-up",
};

export const profilePaths = {
  myProfile: "/protofolio/me",
  editProfile: "/protofolio/:id/edit",
  viewProfile: "/protofolio/:id",
};

// for links
export const publicRoutes = [
  {
    title: "Log In",
    href: authPaths.logIn,
  },
  {
    title: "Sign Up",
    href: authPaths.register,
  },
];
export const protectedRoutes = [
  {
    title: "Portofolio",
    href: profilePaths.myProfile,
  },
  // {
  //   title: "Sign Up",
  //   href: authPaths.register,
  // },
];
