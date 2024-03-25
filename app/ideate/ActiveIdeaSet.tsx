"use client";

import React from "react";
import * as RadioGroup from '@radix-ui/react-radio-group';
import IdeaCard from "./IdeaCard";
import type { Idea } from "../api/ideate/schema";
import LoadingIdeaCard from "./LoadingIdeaCard";
import { Button } from "@/components/ui/button";
import { PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { range } from "@/lib/utils";

interface IdeaSetProps {
  ideas: Idea[];
  isFetching?: boolean;
  defaultCheckedIdea?: string;
  count: number;
}

function ActiveIdeaSet({ ideas, isFetching, count, defaultCheckedIdea }: IdeaSetProps) {
  const [likedIdea, setLikedIdea] = React.useState<string | undefined>(defaultCheckedIdea);

  return (
    <form className="space-y-6 border p-6 w-max rounded-md bg-primary/10 border-primary">
      <Label htmlFor="likedIdea" className="text-xl font-semibold text-primary">Which one do you like?</Label>
      <RadioGroup.Root className="flex justify-center items-stretch flex-wrap gap-4"
        disabled={isFetching}
        onValueChange={setLikedIdea}
        value={likedIdea}
        name="likedIdea"
      >
        {isFetching
          ? range(count).map((i) => <LoadingIdeaCard key={i} />)
          : ideas.map((idea, i) => (
            <RadioGroup.Item value={String(i + 1)} className="group" key={idea.title}>
              <IdeaCard title={idea.title} description={idea.description} />
            </RadioGroup.Item>
          ))}
      </RadioGroup.Root>
      {likedIdea && (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="feedback">Why did you like it ?</Label>
          <Textarea placeholder="Type your message here." id="feedback" />
          <p className="text-sm text-muted-foreground">
            This will help both you and me to know what you really want.
          </p>
        </div>
      )}
      <Button variant="outline" type="submit" className="flex translate-y-10 !mt-0 mx-auto border-primary">
        {likedIdea ? "Generate More" : "Don't like any"}
        {likedIdea ? <PlusIcon /> : <ReloadIcon />}
      </Button>
    </form >
  );
}

export default ActiveIdeaSet;