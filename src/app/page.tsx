"use client";

import { signIn } from "next-auth/react";

const IndexPage = async () => {
  return (
    <>
      <button onClick={() => signIn()}> Sign in </button>
    </>
  );
};

export default IndexPage;
