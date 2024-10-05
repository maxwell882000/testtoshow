import { routingDomain } from "./domain.ts";
import { Pages } from "../../dtos/routing/page.ts";
import { $pageChanged } from "./events.ts";

export const $page = routingDomain.createStore<Pages>(Pages.WELCOME)
  .on($pageChanged, (_, r) => r);