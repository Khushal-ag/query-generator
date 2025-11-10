import { useState } from "react";

import { Check, Copy } from "lucide-react";

import type { CleanQuery } from "@/types/query";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface QueryOutputProps {
  query: CleanQuery;
}

export default function QueryOutput({ query }: QueryOutputProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const jsonString = JSON.stringify(query, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-lg sm:text-xl">Query Output</CardTitle>
          <Button
            onClick={handleCopy}
            variant="outline"
            size="sm"
            className="w-full sm:w-auto"
          >
            {copied ?
              <>
                <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                Copied
              </>
            : <>
                <Copy className="h-4 w-4" />
                Copy
              </>
            }
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <pre className="overflow-x-auto rounded-md bg-muted p-3 text-xs sm:p-4 sm:text-sm">
          <code>{JSON.stringify(query, null, 2)}</code>
        </pre>
      </CardContent>
    </Card>
  );
}
