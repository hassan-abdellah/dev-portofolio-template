import DevSkillsAsyncDropdown from "./components/Forms/DevSkillsAsyncDropdown";
import { useState } from "react";
const App = () => {
  const [skills, setSkills] = useState<string[]>([]);

  return (
    <div className="flex items-center justify-center my-10">
      <DevSkillsAsyncDropdown
        value={skills}
        handleSelect={(values) => setSkills(values)}
      />
    </div>
  );
};

export default App;
