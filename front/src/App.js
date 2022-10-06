import Table from "./components/Table";
import Filter from "./components/Filter";
import { useState } from "react";

function App() {
  
  const headers = [
    { key: "date", label: "Дата", sortable: false },
    { key: "name", label: "Название", sortable: true },
    { key: "amount", label: "Количество", sortable: true },
    { key: "distance", label: "Расстояние", sortable: true },
  ];

  const filterListOptions = [
    { key: "equals", label: "=", sortable: true },
    { key: "contains", label: "Содержит", sortable: true },
    { key: "more", label: ">", sortable: true },
    { key: "less", label: "<", sortable: true },
  ];

  const [filteringOption, setFilteringOption] = useState(""); // saving request from the filtering field
  const [columnChoice, setColumnChoice] = useState(headers[1].key);
  const [signChoice, setSignChoice] = useState(filterListOptions[0].label);  
  const [currentPage, setCurrentPage] = useState(1);

  
  function handleFilteringFieldChange(event) { 
    // saving filtering request
    setFilteringOption(event.target.value);
    // sending user to the first page
    setCurrentPage(1)
  }

  // checking chosen filtering field 
  function handleChoice(event) {
    const newValue = event.target.value;   
    // if user changed headers menu
    if (headers.findIndex((header) => newValue === header.label) >= 0) {
      const keyValue = headers.find((header) => newValue === header.label)
      setColumnChoice(keyValue.key);
    } else {
    // if user changed sign menu
      setSignChoice(newValue);
    }
  }

  return (
    <div className="App">
      <Filter
        headers={headers}
        filterListOptions={filterListOptions}
        handleChange={handleFilteringFieldChange}
        filteringOption={filteringOption}
        handleChoice={handleChoice}
        columnChoice={columnChoice}
        signChoice={signChoice} 
      />
      <Table
        headers={headers}
        filteringOption={filteringOption}
        columnChoice={columnChoice}
        signChoice={signChoice}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
