export enum Methods {
  post = "post",
  get = "get",
  put = "put",
  delete = "delete",
}

interface RequestResponse {
  message?: string;
  error?: string;
  statusCode: number;
}

export const Endpoints = {
  activateUser: (id: string) => `activation/user/${id}`,
  verifyAuth: () => `auth/verify`,
  signin: () => "auth/signin",
  getUser: () => "user",
  userSignUp: () => "auth/signup",
  getPosts: () => "posts",
  countriesList: () => "countries",
};

type EndpointTypes = ReturnType<(typeof Endpoints)[keyof typeof Endpoints]>;

export const Requester = async (
  method: Methods,
  endpoint: EndpointTypes,
  payload?: any,
  tokenFromClient?: string | null,
) => {
  try {
    const rootUrl = process.env.NEST_API_URL;
    const fullUrl = `${rootUrl}/${endpoint}`;
    let token;

    if (tokenFromClient) {
      token = tokenFromClient;
    } else {
      const { cookies } = await import("next/headers");
      const cookieStore = await cookies();
      token = cookieStore.get("auth")?.value;
    }

    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const body =
      method === Methods.get || method === Methods.delete
        ? null
        : JSON.stringify(payload);
    const response = await fetch(fullUrl, { method, headers, body });

    const responseText = await response.text();
    const data = responseText ? JSON.parse(responseText) : null;

    // console.log('endpoint request: ', fullUrl)
    // console.log('payload sent: ', payload)
    // console.log('response data: ', data)
    // console.log('response text: ', responseText)

    return {
      status: response.status,
      data,
    };
  } catch (error: any) {
    console.error("Error from the requester:", error.message);
    console.error("Stack trace:", error.stack);
    throw error;
  }
};
