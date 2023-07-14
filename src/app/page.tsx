"use client";

import { signIn } from "next-auth/react";

const IndexPage = () => {
  return (
    <>
      <button onClick={() => signIn()}> Sign in </button>
    </>
  );
};

export default IndexPage;
