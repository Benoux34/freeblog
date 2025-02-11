"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { UploadButton } from "@uploadthing/react";
import { LoaderCircle } from "lucide-react";
import { OurFileRouter } from "@/app/api/uploadthing/core";

type Props = {
  postId: string;
  initialData?: {
    title?: string;
    content?: string;
    tags?: string;
    imageUrl?: string;
  };
};

const formSchema = z.object({
  tags: z.string(),
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be less than 50 characters"),
  imageUrl: z.string().optional(),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

const PostForm = ({ postId, initialData }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(initialData?.imageUrl || "");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData?.title || "",
      content: initialData?.content || "",
      tags: initialData?.tags || "",
      imageUrl: initialData?.imageUrl || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const tagsArray = values.tags.split(",").map((tag) => tag.trim());

      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postId,
          ...values,
          tags: tagsArray,
          imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input placeholder="nextjs, react, typescript" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Post Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormItem>
          <FormLabel>Post Image</FormLabel>
          <UploadButton<OurFileRouter, "imageUploader">
            endpoint="imageUploader"
            onClientUploadComplete={(res) => {
              setImageUrl(res?.[0]?.url || "");
              form.setValue("imageUrl", res?.[0]?.url || "");
            }}
            onUploadError={(error: Error) => {
              console.error(error);
            }}
          />
          {imageUrl && (
            <div className="mt-2">
              <img
                src={imageUrl}
                alt="Preview"
                className="w-full max-w-xs rounded-lg"
              />
            </div>
          )}
        </FormItem>
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-[30vh]"
                  placeholder="Post Content"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {isLoading ? (
          <Button disabled>
            <LoaderCircle className="animate-spin" />
            Please wait
          </Button>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
};

export { PostForm };
