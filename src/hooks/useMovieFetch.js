import { useState, useEffect } from 'react';

import API from '../API';
//Helper
import { isPersistedState } from '../helpers';

export const useMovieFetch = movieId => {
    const [state, setState] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
   
    useEffect(() => {
        const fetchMovie = async () => {
            try {                
                setError(false);
                setLoading(true);
    
                const movie = await API.fetchMovie(movieId);
                const credits = await API.fetchCredits(movieId);
                // Get directors only
                const directors = credits.crew.filter(
                    member => member.job === 'Director'
                );
    
                setState({
                    ...movie,
                    actors: credits.cast,
                    directors
                });
                
                setLoading(false);
            } catch (error) {
                setError(true);
            }
        };

        const sessionState = isPersistedState(movieId);

        if (sessionState) {
            setState(sessionState);
            setLoading(false);
            return;
        }

        fetchMovie();
    }, [movieId]);

    // Write ro sessionnStorage
    useEffect(() => {
        sessionStorage.setItem(movieId, JSON.stringify(state));
    }, [movieId, state])

    return { state, loading, error };
};