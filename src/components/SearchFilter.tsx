import React, { ChangeEvent } from "react";

import Button from "@/components/Button";

interface SearchFilterProps {
  handleSearchFilter: (e: ChangeEvent<HTMLFormElement>) => void;
}

const SearchFilter = React.forwardRef<HTMLInputElement, SearchFilterProps>(
  ({ handleSearchFilter }, searchRef) => {
    return (
      <form
        className="flex md:w-1/2 mb-2 md:mb-0 ml-2"
        onSubmit={handleSearchFilter}
      >
        <label className="sr-only">Search</label>
        <input
          ref={searchRef}
          placeholder="Search"
          name="search"
          type="text"
          className="outline-none border border-black md:text-base p-1 md:w-full w-1/2"
        />
        <Button className="px-4 py-2" type="submit">
          Search
        </Button>
      </form>
    );
  }
);

export default SearchFilter;
