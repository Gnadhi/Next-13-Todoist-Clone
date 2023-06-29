// Middlware workaround for now: https://stackoverflow.com/questions/73040090/nextjs-middleware-does-not-seem-to-be-triggered

// This uses next-auth to make sure the user is logged in before accessing anything in /app
// https://next-auth.js.org/configuration/nextjs#middleware
export { default } from "next-auth/middleware";

export const config = { matcher: ["/app/(.*)", "/app"] };
