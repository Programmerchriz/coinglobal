
"use server";

import { headers } from "next/headers";
import { auth } from "../auth";

// export const signUp = async (
//   email: string,
//   password: string,
//   name: string,
//   callbackURL?: string,
// ) => {
//   const safeCallback =
//     callbackURL?.startsWith("/") ? callbackURL : `/${callbackURL}`;

//   const response = await auth.api.signUpEmail({
//     body: {
//       email,
//       password,
//       name,
//       callbackURL: safeCallback,
//       // email, password, name, callbackURL: "/verify-email",
//     },
//   });

//   // if (!response.user.emailVerified) {
//   //   await auth.api.sendVerificationEmail({
//   //     body: {
//   //       email,
//   //       callbackURL: "/email-verified",
//   //     },
//   //   });
//   // }

//   return (response);
// };

// export const signIn = async (
//   email: string,
//   password: string,
//   callbackURL?: string,
// ) => {
//   const safeCallback =
//     callbackURL?.startsWith("/") ? callbackURL : `/${callbackURL}`;

//   const response = await auth.api.signInEmail({
//     body: {
//       email,
//       password,
//       callbackURL: safeCallback,
//     },
//   });

//   return (response);
// };

export const signOut = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });
};

// export const signInSocial = async (
//   provider: "google",
//   callbackURL?: string
// ) => {
//   const safeCallback =
//     callbackURL?.startsWith("/") ? callbackURL : `/${callbackURL}`;

//   const { url } = await auth.api.signInSocial({
//     body: {
//       provider,
//       callbackURL: safeCallback,
//     },
//   });

//   if (url) {
//     redirect(url);
//   }
// };

// export const signOutSocial = async () => {
//   const response = await auth.api.signOut({
//     headers: await headers(),
//   });

//   return (response);
// };
