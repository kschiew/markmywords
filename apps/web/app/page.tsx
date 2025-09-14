import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
export default function Page() {
  return (
    <div className="container mx-auto p-8 flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">markmywords</h1>
        <Input placeholder="Mark my words, ..." />
        <Button size="sm">Button</Button>
      </div>
    </div>
  );
}
