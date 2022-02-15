import axios from 'axios';
import {
  routeGetArticles,
  routeGetArticleByID,
  routeGetArticlesFull,
  routeGetReferences,
  routeGetReferencesByArticle,
  routeGetReferenceByArticle,
  routeGetArticlesFiltered,
  routeGetArticlesSortedByTitle,
  routeGetArticlesSortedByDate,
  routePostArticle,
  routePostReference,
  routePutArticle,
  routePutReference,
  routeDeleteArticle,
  routeDeleteReference,
} from './Routes.js';

async function get(url, param1 = null, param2 = null) {
  try {
    var newUrl;
    if (param1) {
      newUrl = url + '/' + param1;

      if (param2) {
        newUrl = newUrl + '/' + param2;
      }
    } else {
      newUrl = url;
    }
    return (await axios.get(newUrl)).data;
  } catch (err) {
    if (url === routeGetArticles) {
      alert('Could not get articles.');
    }
    if (url === routeGetReferences) {
      alert('Could not get references.');
    }
    if (url === routeGetArticlesFull) {
      alert('Could not get articles + references.');
    }
    if (url === routeGetArticleByID) {
      alert('Could not get article with this ID.');
    }
    if (url === routeGetArticlesSortedByDate) {
      alert('Could not get articles sorted by date.');
    }
    if (url === routeGetArticlesSortedByTitle) {
      alert('Could not get articles sorted by title.');
    }
    if (url === routeGetReferenceByArticle) {
      alert('Could not get reference.');
    }
    if (url === routeGetReferencesByArticle) {
      alert('Could not get references.');
    }
  }
}

async function post(url, elem, id = null) {
  try {
    let newUrl = id ? url + '/' + id : url;
    return (
      await axios.post(newUrl, elem, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).data;
  } catch (err) {
    if (url === routePostArticle) {
      alert('Could not insert article.');
    }
    if (url === routePostReference) {
      alert('Could not insert reference.');
    }
  }
}

async function put(url, elem, param1, param2 = null) {
  try {
    let newUrl = url + '/' + param1;
    if (param2) {
      newUrl = newUrl + '/' + param2;
    }
    return (
      await axios.put(newUrl, elem, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    ).data;
  } catch (err) {
    if (url === routePostArticle) {
      alert('Could not update article.');
    }
    if (url === routePostReference) {
      alert('Could not update reference.');
    }
  }
}

async function remove(url, param1, param2 = null) {
  try {
    let newUrl = url + '/' + param1;
    if (param2) {
      newUrl = newUrl + '/' + param2;
    }

    return (await axios.delete(newUrl)).data;
  } catch (err) {
    if (url === routeDeleteArticle) {
      alert('Could not delete article.');
    }
    if (url === routeDeleteReference) {
      alert('Could not delete reference.');
    }
  }
}

async function getQuery(url, _titlu, _rezumat) {
  try {
    const params = new URLSearchParams({ titlu: _titlu, rezumat: _rezumat });
    var urlFilter = url + '?';
    return (await axios.get(`${urlFilter}${params}`)).data;
  } catch (err) {
    alert('Could not get articles filtered.');
  }
}

export { get, post, remove, put, getQuery };
