import { useState, useEffect } from 'react';
import { get, put, post } from '../Calls.js';
import { useNavigate } from 'react-router-dom';
import {
  routePostReference,
  routePutReference,
  routeGetReferenceByArticle,
} from '../Routes';
import SaveIcon from '@material-ui/icons/Save';
import { Grid, TextField, Button } from '@material-ui/core';

export default function FormReference() {
  const navigate = useNavigate();

  const [reference, setReference] = useState({
    ReferenceID: 0,
    ReferenceTitlu: '',
    ReferenceData: '',
    ReferenceListaAutori: '',
    ArticleID: JSON.parse(sessionStorage.getItem('idArticle')),
  });

  const onChangeReference = (e) => {
    setReference({ ...reference, [e.target.name]: e.target.value });
  };

  const saveReference = async () => {
    if (!JSON.parse(sessionStorage.getItem('putScreen')))
      await post(
        routePostReference,
        reference,
        JSON.parse(sessionStorage.getItem('idArticle'))
      );
    else
      await put(
        routePutReference,
        reference,
        reference.ArticleID,
        reference.ReferenceID
      );

    navigate('/references');
  };

  useEffect(async () => {
    if (JSON.parse(sessionStorage.getItem('putScreen'))) {
      let data = await get(
        routeGetReferenceByArticle,
        JSON.parse(sessionStorage.getItem('idArticle')),
        JSON.parse(sessionStorage.getItem('idReference'))
      );
      setReference(data);
    }
  }, []);

  return (
    <div>
      <Grid container spacing={2} direction="row" justifyContent="flex-start">
        <Grid item xs={2}>
          <TextField
            margin="dense"
            id="ReferenceID"
            name="ReferenceID"
            label="ID"
            fullWidth
            disabled={true}
            value={reference.ReferenceID}
            onChange={(e) => onChangeReference(e)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            margin="dense"
            id="ReferenceTitlu"
            name="ReferenceTitlu"
            label="Title"
            fullWidth
            value={reference.ReferenceTitlu}
            onChange={(e) => onChangeReference(e)}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            margin="dense"
            id="ReferenceData"
            name="ReferenceData"
            label="Date (YYYY-MM-DD)"
            fullWidth
            value={reference.ReferenceData}
            onChange={(e) => onChangeReference(e)}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            margin="dense"
            id="ReferenceListaAutori"
            name="ReferenceListaAutori"
            label="Authors"
            fullWidth
            value={reference.ReferenceListaAutori}
            onChange={(e) => onChangeReference(e)}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            margin="dense"
            id="ArticleID"
            name="ArticleID"
            label="Article ID"
            fullWidth
            disabled={true}
            value={reference.ArticleID}
            onChange={(e) => onChangeReference(e)}
          />
        </Grid>
      </Grid>

      <br />

      <Button
        color="primary"
        variant="contained"
        startIcon={<SaveIcon />}
        onClick={() => saveReference()}
      >
        Save
      </Button>
    </div>
  );
}
