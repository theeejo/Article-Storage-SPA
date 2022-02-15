import { useState, useEffect } from 'react';
import { get, remove } from '../Calls.js';
import { useNavigate } from 'react-router-dom';
import { routeGetReferencesByArticle, routeDeleteReference } from '../Routes';

import AddCircle from '@material-ui/icons/AddCircle';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import EditIcon from '@material-ui/icons/Edit';
import ArrowBack from '@material-ui/icons/ArrowBack';
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  TableHead,
  IconButton,
} from '@material-ui/core';

export default function References() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [willUpdate, setWillUpdate] = useState(false);

  useEffect(async () => {
    let data = await get(
      routeGetReferencesByArticle,
      JSON.parse(sessionStorage.getItem('idArticle'))
    );
    setRows(data);
  }, [willUpdate]);
  useEffect(async () => {
    sessionStorage.setItem('putScreen', '');
    sessionStorage.setItem('idReference', '');
  }, []);

  const navigateToFormUpdateReference = (idReference) => {
    sessionStorage.setItem('putScreen', true);
    sessionStorage.setItem('idReference', idReference);
    navigate('/formReference');
  };

  const deleteReference = async (idReference, index) => {
    await remove(
      routeDeleteReference,
      JSON.parse(sessionStorage.getItem('idArticle')),
      idReference
    );

    rows.splice(index, 1);
    setRows(rows);
    setWillUpdate(!willUpdate);
  };

  const navigateToFormAddReference = () => {
    sessionStorage.setItem('putScreen', 'false');
    navigate('/formReference');
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Date</TableCell>
              <TableCell align="center">Authors</TableCell>
              <TableCell align="center">Article ID</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.ReferenceID}>
                <TableCell component="th" scope="row">
                  {row.ReferenceID}
                </TableCell>
                <TableCell align="center">{row.ReferenceTitlu}</TableCell>
                <TableCell align="center">{row.ReferenceData}</TableCell>
                <TableCell align="center">{row.ReferenceListaAutori}</TableCell>
                <TableCell align="center">{row.ArticleID}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() =>
                      navigateToFormUpdateReference(row.ReferenceID)
                    }
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteReference(row.ReferenceID, index)}
                  >
                    <RemoveCircle color="secondary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <br />
      <Button
        color="primary"
        variant="contained"
        startIcon={<AddCircle />}
        onClick={() => navigateToFormAddReference()}
      >
        New reference
      </Button>
      <br />
      <br />
      <Button
        color="primary"
        variant="contained"
        startIcon={<ArrowBack />}
        onClick={() => navigate('/')}
      >
        Back
      </Button>
    </div>
  );
}
