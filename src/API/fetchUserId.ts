import { URLs } from "../constants";
import fetchData from "./fetchData";

export default async function fetchUserId() {
  let data;
  try {
    data = await fetchData({ url: URLs.accountId });
  } catch (err) {
    console.error(err);
    throw err;
    return undefined;
  }
  return data.id;
}
