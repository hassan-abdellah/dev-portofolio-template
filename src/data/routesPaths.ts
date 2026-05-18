export const authPaths = {
  logIn: "/auth/sign-in",
  register: "/auth/sign-up",
};

export const profilePaths = {
  myProfile: "/profile/me",
  editProfile: "/profile/:id/edit",
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
    title: "My Profile",
    href: profilePaths.myProfile,
  },
  // {
  //   title: "Sign Up",
  //   href: authPaths.register,
  // },
];
