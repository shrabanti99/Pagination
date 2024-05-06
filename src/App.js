import { useEffect, useState } from "react";


export default function App() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [membersPerPage] = useState(10);
  const employee = async () => {
    try {
      const res = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      
      const dat = await res.json();
      setData(dat);
    } catch (error) {
      alert("Failed to fetch data");
    }
  };
  useEffect(() => {
    employee();
  }, []);
  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = data.slice(indexOfFirstMember, indexOfLastMember);
  const page = (pagenumber) => setCurrentPage(pagenumber);
  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {currentMembers.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button
            onClick={() => page(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button>{currentPage}</button>
          <button
            onClick={() => page(currentPage + 1)}
            disabled={indexOfLastMember >= data.length}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
