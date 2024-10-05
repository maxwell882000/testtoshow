import { routingDomain } from "./domain.ts";
import { Pages } from "../../dtos/routing/page.ts";

export const $pageChanged = routingDomain.createEvent<Pages>();