export const movieToFilterMap = {
  all: () => null,
  watchlist: (movies) => movies.filter((movie) => movie.isWatchlist).length,
  history: (movies) => movies.filter((movie) => movie.isWatched).length,
  favorites: (movies) => movies.filter((movie) => movie.isFavorite).length,
};

export const generateFilter = (movies) => {
  return Object.entries(movieToFilterMap).map(([filterName, countMovies]) => {
    return {
      name: filterName,
      count: countMovies(movies),
    };
  });
};
