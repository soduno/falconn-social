import { Endpoints, Methods, Requester } from "../../global/requester";

export const getPostsForUser = async () => {
  const response = await Requester(Methods.get, Endpoints.getPosts());

  if (response.status !== 200) {
    return false;
  }

  return response.data;
};
