import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchArticles = () => dispatch => {

    dispatch(articlesLoading());

    return fetch(baseUrl + 'articles')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(articles => dispatch(addArticles(articles)))
        .catch(error => dispatch(articlesFailed(error.message)));
};

export const articlesLoading = () => ({
    type: ActionTypes.ARTICLES_LOADING
});

export const articlesFailed = errMess => ({
    type: ActionTypes.ARTICLES_FAILED,
    payload: errMess
});

export const addArticles = articles => ({
    type: ActionTypes.ADD_ARTICLES,
    payload: articles
});

export const fetchShows = () => dispatch => {

    dispatch(showsLoading());

    return fetch(baseUrl + 'shows')
        .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    const error = new Error(`Error ${response.status}: ${response.statusText}`);
                    error.response = response;
                throw error;
                }
            },
            error => {
                const errMess = new Error(error.message);
                throw errMess;
            })
        .then(response => response.json())
        .then(shows => dispatch(addShows(shows)))
        .catch(error => dispatch(showsFailed(error.message)));
};

export const showsLoading = () => ({
    type: ActionTypes.SHOWS_LOADING
});

export const showsFailed = errMess => ({
    type: ActionTypes.SHOWS_FAILED,
    payload: errMess
});

export const addShows = shows => ({
    type: ActionTypes.ADD_SHOWS,
    payload: shows
});

export const postInterested = articleId => dispatch => {
    setTimeout(() => {
        dispatch(addInterested(articleId));
    }, 2000);
};

export const addInterested = articleId => ({
    type: ActionTypes.ADD_INTERESTED,
    payload: articleId
});

export const deleteInterested = articleId => ({
    type: ActionTypes.DELETE_INTERESTED,
    payload: articleId
});