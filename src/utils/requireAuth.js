import { redirect } from "react-router-dom";
import store from "../store";

export async function requireAuth(request) {
  const username = store.getState().user.userName;

  const url = new URL(request.url).pathname;
  if (!username) {
    throw redirect(`/?redirectTo=${url}&message=Login to access the menu`);
  }
}
