// import { redirect } from "next/navigation";
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { prisma } from './prisma';
// import { PrismaClient } from "@prisma/client";
import { createAuthMiddleware, APIError } from 'better-auth/api';
import { passwordSchema } from './validation';

// import sendEmail from './email';

// const prisma = new PrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: 'postgresql' }),

  rateLimit: {
    window: 60,
    max: 20,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  emailAndPassword: {
    enabled: true,
    // requireEmailVerification: true,
  },

  // emailVerification: {
  //   sendOnSignUp: true,
  //   sendOnSignIn: true,
  //   autoSignInAfterVerification: true,

  //   async sendVerificationEmail({
  //     user,
  //     url,
  //   }) {
  //     await sendEmail({
  //       to: "programmerchris6002@gmail.com",
  //       subject: "Verify your email",
  //       text: `Click the link to verify your email ${url}`,
  //     });

  //     redirect("/verify-email");
  //   },
  // },

  user: {
    additionalFields: {
      role: {
        type: 'string',
        input: false,
      },
      theme: {
        type: 'string',
        input: false,
      },
    },
  },

  hooks: {
    before: createAuthMiddleware(async (ctx) => {
      if (
        ctx.path === '/signup/password'
        // || ctx.path === "/reset-password"
        // || ctx.path === "/change-password"
      ) {
        const password = ctx.body.password;
        // || ctx.body.newPassword
        const { error } = passwordSchema.safeParse(password);

        if (error) {
          throw new APIError('BAD_REQUEST', {
            message: 'Password not strong enough',
          });
        }
      }
    }),
  },

  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
export type User = typeof auth.$Infer.Session.user;
