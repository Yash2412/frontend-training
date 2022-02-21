import { useEffect, useState } from "react";
import "../style.css";
import FormInput from "./FormInput";
import MovieList from "./MovieList";
import { Pagination } from "./Pagination";
import { ApiResponseType, MovieInfo } from "./Types";

function App() {
  const [movieName, setMovieName] = useState<string>("");
  const [movieYear, setMovieYear] = useState<string>("");
  const [pageNumber, setPageNumber] = useState(1);
  const [apiResponse, setApiResponse] = useState({
    Error: "Search a Movie or Series",
    Response: "False",
  } as ApiResponseType);

  const getApiResponse = async () => {
    const response = await fetch(
      `https://www.omdbapi.com/?s=${movieName}&y=${movieYear}&page=${pageNumber}&plot&apikey=375555b6`
    );
    const json: ApiResponseType = await response.json();
    console.log(json);

    setApiResponse(json);
  };
  useEffect(() => {
    if (movieName) getApiResponse();
  }, [movieName, movieYear, pageNumber]);

  useEffect(() => {
    setPageNumber(1);
  }, [movieName, movieYear]);

  return (
    <div className="App container">
      <div className="row m-4 ">
        <div className="col-md-4 col-12">
          <FormInput
            setMovieNameRoot={setMovieName}
            setMovieYearRoot={setMovieYear}
          />
        </div>
        <div className="col-md-8 col-12 p-4 border rounded bg-white">
          {apiResponse.Response == "True" &&
          apiResponse.Search &&
          apiResponse.totalResults ? (
            <>
              <MovieList moviesList={apiResponse.Search} />
              <Pagination
                pageNumber={pageNumber}
                setPageNumber={setPageNumber}
                totalResult={+apiResponse.totalResults}
              />
            </>
          ) : (
            <h3 className="text-center">{apiResponse.Error}</h3>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
