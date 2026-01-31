import { fetchSearchBarInput } from './getSearchBarInput.ts';
import { filterSearchResults } from '../../../components/serachAndFilter/filterSearchResults.ts';

export async function runSearchAnfFilter() {
  fetchSearchBarInput();
  await filterSearchResults();
}
