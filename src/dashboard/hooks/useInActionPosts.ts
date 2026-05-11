import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  createInActionPostAPICall,
  deleteInActionPostAPICall,
  getAllInActionPostsAPICall,
  toggleInActionPostPublishAPICall,
} from "../services/inActionPostService";
import type {
  InActionPostDTO,
  InActionPostFormValues,
  InActionPostResponse,
} from "../types/inActionPosts";

export const inActionPostQueryKeys = {
  all: ["in-action-posts", "all"] as const,
  publicAll: ["public", "in-action-posts"] as const,
};

export const useInActionPosts = () =>
  useQuery<InActionPostDTO[]>({
    queryKey: inActionPostQueryKeys.all,
    queryFn: getAllInActionPostsAPICall,
  });

export const useCreateInActionPost = () => {
  const queryClient = useQueryClient();

  return useMutation<InActionPostResponse, Error, InActionPostFormValues>({
    mutationFn: createInActionPostAPICall,
    onSuccess: (data) => {
      toast.success(data.message || "In Action post created successfully");
      queryClient.invalidateQueries({ queryKey: inActionPostQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: inActionPostQueryKeys.publicAll });
    },
  });
};

export const useDeleteInActionPost = () => {
  const queryClient = useQueryClient();

  return useMutation<{ message: string }, Error, string>({
    mutationFn: deleteInActionPostAPICall,
    onSuccess: (data) => {
      toast.success(data.message || "In Action post deleted successfully");
      queryClient.invalidateQueries({ queryKey: inActionPostQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: inActionPostQueryKeys.publicAll });
    },
  });
};

export const useToggleInActionPostPublish = () => {
  const queryClient = useQueryClient();

  return useMutation<InActionPostResponse, Error, { id: string; isPublished: boolean }>({
    mutationFn: ({ id, isPublished }) =>
      toggleInActionPostPublishAPICall(id, isPublished),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: inActionPostQueryKeys.all });
      queryClient.invalidateQueries({ queryKey: inActionPostQueryKeys.publicAll });
    },
  });
};

