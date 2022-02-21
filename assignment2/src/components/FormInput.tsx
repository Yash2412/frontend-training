import { useState } from "react";

interface IProps {
  setMovieNameRoot: React.Dispatch<React.SetStateAction<string>>;
  setMovieYearRoot: React.Dispatch<React.SetStateAction<string>>;
}

export default function FormInput(props: IProps) {
  const [movieName, setMovieName] = useState<string>("");
  const [movieYear, setMovieYear] = useState<string>("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    props.setMovieNameRoot(movieName);
    props.setMovieYearRoot(movieYear);
  };
  return (
    <form
      className="border rounded p-4 bg-white"
      onSubmit={handleSubmit}
      autoComplete="off"
    >
      <div className="mb-3">
        <label htmlFor="movie-name" className="form-label">
          Movie Name <span className="text-danger">*</span>
        </label>
        <input
          required
          type="text"
          className="form-control"
          id="movie-name"
          aria-describedby="emailHelp"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="movie-year" className="form-label">
          Release Year
        </label>
        <input
          type="text"
          className="form-control"
          id="movie-year"
          value={movieYear}
          onChange={(e) => setMovieYear(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
