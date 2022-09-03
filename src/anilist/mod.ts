import search, { SearchResponse } from "./search.ts";
import getMedia, { Media as MediaI, MediaResponse } from "./getMedia.ts";
import getInlineResults, { InlineResultsType } from "./inlineResults.ts";

export { getInlineResults, getMedia, search };

export type { InlineResultsType, MediaI, MediaResponse, SearchResponse };
