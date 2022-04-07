import { FolderItem } from "@/types/useFileManager";

const normalizeString = ( input: string ) => {
  return input.replaceAll(' ', '-').toLowerCase();
}

const filterItems = ( itemsArray: FolderItem[], filterQuery: string ) => {
  const normalizedFilterQuery = normalizeString(filterQuery);
  const filteredArray = itemsArray.filter(item => {
    const normalizedFilterItemName = normalizeString(item.name);
    return normalizedFilterItemName.includes(normalizedFilterQuery);
  });
  return filteredArray;
}

export default filterItems;