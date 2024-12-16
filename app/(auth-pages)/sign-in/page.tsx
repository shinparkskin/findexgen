import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Input, Image } from "@nextui-org/react";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="mb-10">
        <Image src="/logo/logo1.png" alt="logo" className="w-80 h-auto" />
      </div>
      <div>
        <form className="flex flex-col w-80">
          <div className="flex flex-col gap-5 [&>input]:mb-3">
            <Label htmlFor="email">이메일</Label>
            <Input variant="bordered" name="email" placeholder="이메일을 입력해주세요" required />
            <div className="flex justify-between items-center">
              <Label htmlFor="password">비밀번호</Label>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              required
              variant="bordered"
            />
            <SubmitButton pendingText="Signing In..." formAction={signInAction}>
              Sign in
            </SubmitButton>
            <FormMessage message={searchParams} />
          </div>
        </form>
      </div>
    </div>
  );
}
