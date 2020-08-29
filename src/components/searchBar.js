import React, { useState } from "react";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";

const SearchBar = (text) => {
  const [textValue, setTextValue] = useState("");

  return (
    <div>
      <FormControl>
        <Input
          onChange={(e) => setTextValue(e.target.value)}
          id="my-input"
          aria-describedby="my-helper-text"
          placeholder="Search Bikes Reports"
        />
      </FormControl>
    </div>
  );
};

export default SearchBar;
