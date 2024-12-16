"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@nextui-org/react";

export function SubmitButton({
  children,
  ...props
}) {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      isLoading={pending}
      color="primary"
      {...props}
    >
      로그인
    </Button>
  );
}
