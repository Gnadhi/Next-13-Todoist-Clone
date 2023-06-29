"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Button } from "@/ui/Button";

type ToggleFrameworkProps = {
  isFrameworkActive: boolean;
  frameworkId: string;
};
export const ToggleFramework = ({
  frameworkId,
  isFrameworkActive,
}: ToggleFrameworkProps) => {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);

  const toggleFramework = async () => {
    setIsFetching(true);

    await fetch(`/api/toggle-framework/?selectedFrameworkId=${frameworkId}`, {
      method: "POST",
    });
    router.push("/app/frameworks");

    setIsFetching(false);
  };

  return isFrameworkActive ? (
    <Button onClick={() => toggleFramework()}> Activate </Button>
  ) : (
    <Button onClick={() => toggleFramework()}> Deactivate </Button>
  );
};
