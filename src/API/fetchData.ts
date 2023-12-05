import { TOKEN } from "../constants";

export default async function fetchData({
  token = TOKEN,
  url,
  method = "GET",
  headers = {
    accept: "application/json",
    "content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
  body,
}: parametrsInterface) {
  let response, data;
  try {
    response = await fetch(url, {
      method: method,
      headers: headers,
      body: JSON.stringify(body),
    });
    if (response?.ok && isResponseStatusCorrect(response)) {
      data = await response.json();
    } else if (!isResponseStatusCorrect(response)) {
      throw new Error(
        "Error on the server side, response status isn't correct"
      );
    } else {
      console.warn(`response in fetchObj is not ok`, response);
    }
  } catch (err) {
    console.error(`error in fetchData`, err);
    throw err;
  }
  return data;
}

function isResponseStatusCorrect(response: { status: number }) {
  return response.status === 200 || response.status === 201;
}

interface parametrsInterface {
  token?: string;
  url: string | URL;
  method?: string;
  headers?: {
    accept?: string;
    Authorization?: string;
    "content-type"?: string;
  };
  body?: {
    media_type?: string;
    media_id?: number;
    favorite?: boolean;
  };
}
