import { FC, useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { useDebounce } from "use-debounce";

type SearchFilterProps = {
  label?: string;
  placeholder?: string;
  debounceMs?: number;
  onSearchChange: (searchTerm: string) => void;
  autoComplete?: string;
};

export const SearchFilter: FC<SearchFilterProps> = ({
  label = "Search",
  placeholder,
  debounceMs = 300,
  onSearchChange,
  autoComplete = "off",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, debounceMs);

  // Call the parent's onSearchChange when debounced term changes
  useEffect(() => {
    onSearchChange(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearchChange]);

  return (
    <TextField
      autoComplete={autoComplete}
      label={label}
      placeholder={placeholder}
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      fullWidth
    />
  );
}; 