"use client";

import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import axios from "axios";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { title } from "process";

import { Octokit } from "@octokit/rest";

interface RepoNameProps {
  params: {
    RepoName: string;
  };
}

const formSchema = z.object({
  title: z.string().min(2).max(100),
  description: z.string().min(2).max(500),
  bounty: z.string().min(1).max(3),
});

type issueForm = z.infer<typeof formSchema>;

const Page: React.FC<RepoNameProps> = ({ params }) => {
  const { data: session, status } = useSession();

  const accessToken = session?.accessToken;

  const formMethods = useForm<issueForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "New Issue",
      description: "",
      bounty: "0",
    },
  });

  const handleSubmit = async (data: issueForm) => {
    if (!session) {
      toast.error("You need to be logged in to create an issue.");
      return;
    }

    try {
      const res = await axios.post(
        `https://api.github.com/repos/${session.user?.name}/${params.RepoName}/issues`,
        {
          title: data.title,
          body: data.description,
        },
        {
          headers: {
            Authorization: `token ${session.accessToken}`,
          },
        }
      );

      console.log(res);

      //   console.log(res);

      toast.success("Issue created successfully!");
    } catch (error) {
      console.log("Create issue error : ", error);
      toast.error("Failed to create issue.");
    }
  };

  return (
    <div>
      <h1 className="mt-5 px-12 text-4xl text-white">
        Repo: {params.RepoName}
      </h1>
      <div className="px-10 py-4">
        <Separator className="bg-slate-600" />
      </div>
      <div className="px-12 py-4">
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
            <div className="text-white">
              <FormField
                control={formMethods.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter Title"
                        {...field}
                        className="bg-githubComp text-white"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="w-32 mt-5">
                <FormField
                  control={formMethods.control}
                  name="bounty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bounty</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="0"
                          {...field}
                          className="bg-githubComp text-white"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5">
                <FormField
                  control={formMethods.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter Description of Issue"
                          {...field}
                          className="text-white bg-githubComp"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-5">
                <Button
                  variant="default"
                  className="bg-green-600 hover:bg-green-700 hover:text-black transition"
                  type="submit"
                >
                  Create Issue
                </Button>
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default Page;
