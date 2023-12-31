import { InputHead } from "../Signup/Signup.style";
import { useState, useEffect } from "react";
import {
  SearchBar,
  HoldIcon,
  SearchField,
  FilterContainer,
  FilterLabel,
  FilterOptions,
  FilterOption,
} from "./Aside.style";
import { IoFilterSharp, IoSearchOutline } from "react-icons/io5";
import TransactionList from "./TransactionsList";
import Api from "../../api.config";

const filterOptions = ["newest", "oldest", "credit", "debit"];

interface ListTransactionsProps{
    refresh: boolean;
}

function ListTransactions({refresh}: ListTransactionsProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [filter, setFilter] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    Api.get(
      `/transactions/getTransactions?search=${search}&filter=${filterOptions[filter]}`
    ).then((res) => {
      setTransactions(res.data.data);
    });
  }, [search, filter, refresh]);
  return (
    <div style={{ padding: "24px" }}>
      <form onSubmit={(e) => e.preventDefault()}>
        <InputHead>
          <SearchBar>
            <HoldIcon htmlFor="search">
              <IoSearchOutline size={16} />
            </HoldIcon>
            <SearchField
              id="search"
              placeholder="Search transactions"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </SearchBar>
          <FilterContainer>
            <FilterLabel onClick={() => setShowOptions(!showOptions)}>
              <IoFilterSharp size={32} />
            </FilterLabel>
            <FilterOptions show={showOptions}>
              {filterOptions.map((option, index) => (
                <FilterOption
                  key={option}
                  highlight={filter === index}
                  onClick={() => {
                    setFilter(index);
                    setShowOptions(false);
                  }}
                >
                  {option}
                </FilterOption>
              ))}
            </FilterOptions>
          </FilterContainer>
        </InputHead>
      </form>
      <TransactionList transactions={transactions} />
    </div>
  );
}

export default ListTransactions;
