import { useState, useEffect } from 'react';
import { get, put, post } from '../Calls.js';
import { useNavigate } from 'react-router-dom';
import {
  routePostArticle,
  routeGetArticleByID,
  routePutArticle,
} from '../Routes.js';

import SaveIcon from '@material-ui/icons/Save';
import { Grid, TextField, Button } from '@material-ui/core';

export default function FormArticle() {
  const navigate = useNavigate();

  const [article, setArticle] = useState({
    ArticleID: 0,
    ArticleTitlu: '',
    ArticleRezumat: '',
    ArticleData: '',
  });

  const onChangeArticle = (e) => {
    setArticle({ ...article, [e.target.name]: e.target.value });
  };

  const saveArticle = async () => {
    if (!JSON.parse(sessionStorage.getItem('putScreen'))) {
      await post(routePostArticle, article);
    } else {
      await put(routePutArticle, article, article.ArticleID);
    }
    navigate('/');
  };

  useEffect(async () => {
    if (JSON.parse(sessionStorage.getItem('putScreen'))) {
      let data = await get(
        routeGetArticleByID,
        JSON.parse(sessionStorage.getItem('idArticle'))
      );
      setArticle(data);
    }
  }, []);

  return (
    <div>
      <Grid container spacing={2} direction="row" justifyContent="flex-start">
        <Grid item xs={2}>
          <TextField
            margin="dense"
            id="ArticleID"
            name="ArticleID"
            label="ID"
            fullWidth
            disabled={true}
            value={article.ArticleID}
            onChange={(e) => onChangeArticle(e)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            margin="dense"
            id="ArticleTitlu"
            name="ArticleTitlu"
            label="Title"
            fullWidth
            value={article.ArticleTitlu}
            onChange={(e) => onChangeArticle(e)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            margin="dense"
            id="ArticleRezumat"
            name="ArticleRezumat"
            label="Summary"
            fullWidth
            value={article.ArticleRezumat}
            onChange={(e) => onChangeArticle(e)}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            margin="dense"
            id="ArticleData"
            name="ArticleData"
            label="Publication Date (YYYY-MM-DD)"
            fullWidth
            value={article.ArticleData}
            onChange={(e) => onChangeArticle(e)}
          />
        </Grid>
      </Grid>
      <br />
      <Button
        color="primary"
        variant="contained"
        startIcon={<SaveIcon />}
        onClick={() => saveArticle()}
      >
        Save
      </Button>
    </div>
  );
}
