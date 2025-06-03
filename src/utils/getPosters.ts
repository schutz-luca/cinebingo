import { Content } from '../@types/content.type';

export const getMoviePosters = async (movies: Content[]) => {
    const movieData = [];

    for (const movie of movies) {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_TMDB_URL}/3/search/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&query=${movie.name}`,
            );

            const tmdbMovie = (await response.json()).results[0];

            if (tmdbMovie) {
                movieData.push({
                    ...movie,
                    tmdbId: tmdbMovie.id,
                    poster: tmdbMovie.poster_path ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}` : null,
                });
            } else {
                movieData.push({ ...movie, id: null, poster: null });
            }
        } catch (error: any) {
            console.error(`Error fetching "${movie}":`, error.message);
        }
    }

    return movieData;
};
