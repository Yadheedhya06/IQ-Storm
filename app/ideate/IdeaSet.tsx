"use client";

import React from "react";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import IdeaCard from "./IdeaCard";
import type { Idea } from "../api/ideate/schema";
import LoadingIdeaCard from "./LoadingIdeaCard";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface IdeaSetProps {
  ideas: Idea[];
  isActive?: boolean;
  isFetching?: boolean;
  defaultCheckedIdea?: string;
  count: number;
}

function IdeaSet({ ideas, isActive, isFetching, count, defaultCheckedIdea }: IdeaSetProps) {
  const [checkedIdea, setCheckedIdea] = React.useState<string | undefined>(defaultCheckedIdea);

  return (
    <div className={cn("border p-6 w-max rounded-md", isActive ? "bg-primary/10 border-primary" : "")}>
      {isActive && <h2 className="text-xl font-semibold text-primary mb-4">Which one do you like?</h2>}
      <ToggleGroup.Root className="flex justify-center items-stretch flex-wrap gap-4"
        type="single"
        disabled={!isActive || isFetching}
        onValueChange={setCheckedIdea}
        value={checkedIdea}
      >
        {isFetching
          ? [...Array(count).keys()].map((i) => <LoadingIdeaCard key={i} />)
          : ideas.map((idea, i) => (
            <ToggleGroup.Item value={String(i + 1)} className="group" key={idea.title}>
              <IdeaCard title={idea.title} description={idea.description} />
            </ToggleGroup.Item>
          ))}
      </ToggleGroup.Root>
      {isActive && checkedIdea && (
        <div className="grid w-full gap-1.5 mt-6">
          <Label htmlFor="feedback">Why did you like it ?</Label>
          <Textarea placeholder="Type your message here." id="feedback" />
          <p className="text-sm text-muted-foreground">
            This will help both you and me to know what you really want :)
          </p>
        </div>
      )}
      {isActive && (
        <Button variant="outline" type="submit" className="translate-y-10 mx-auto flex border-primary">
          {checkedIdea ? "Generate More" : "Don't like any"}
          {checkedIdea ? <PlusIcon /> : <ReloadIcon />}
        </Button>
      )}
    </div >
  );
}

export default IdeaSet;
