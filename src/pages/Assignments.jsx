import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../hooks/useAxios";
import { Helmet } from "react-helmet-async";
import AssignmentCard from "../components/AssignmentCard";
import { useState } from "react";
import emptyIcon from '../assets/images/empty.png';

const assignmentsFetcher = async(query) => {
  const res = await axiosInstance.get(`/assignments?level=${query}`);
  return res.data;
}

const Assignments = () => {
  const [query, setQuery] = useState("All");
  const {data: assignments, isLoading, refetch} = useQuery({queryKey: ['assignments', query], queryFn: () => assignmentsFetcher(query)});

  const handleOnChange = e => {
    const val = e.target.value;
    setQuery(val);
    refetch();
  }

  return (
    <main className="mt-10">
      <Helmet>
        <title>Assignments - StudyHub</title>
      </Helmet>

      <section>
        <div className="container">
          <div className="flex items-center gap-2">
            <span className="font-medium">Filter: </span>
            <select className="input w-full max-w-[200px] h-[35px] border-primary cursor-pointer" onChange={handleOnChange} name="difficulty-level" id="difficulty-level">
              <option value="All">All</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {
            !isLoading ? assignments?.length ? <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {
              assignments?.map(assignment => <AssignmentCard key={assignment._id} assignment={assignment} />)
            }
          </div> : <div className="mt-10 text-center">
            <img className="w-[150px] mx-auto mb-4" src={emptyIcon} alt="Empty Icon" />
            <h3 className="text-2xl sm:text-3xl font-medium">No Assignment Found !!!</h3>
          </div> : <div className="mt-12 md:mt-16 text-center">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
          }
        </div>
      </section>
    </main>
  );
};

export default Assignments;