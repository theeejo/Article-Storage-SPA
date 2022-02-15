import { useState, useEffect } from 'react';
import { get, getQuery, remove } from '../Calls.js';
import { useNavigate } from 'react-router-dom';
import {
  routeGetArticles,
  routeGetArticlesFiltered,
  routeGetArticlesSortedByTitle,
  routeGetArticlesSortedByDate,
  routeDeleteArticle,
} from '../Routes';
import AddCircle from '@material-ui/icons/AddCircle';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import EditIcon from '@material-ui/icons/Edit';
import RemoveCircle from '@material-ui/icons/RemoveCircle';
import {
  Grid,
  TextField,
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

export default function ArticleTable() {
  const navigate = useNavigate();

  const [rows, setRows] = useState([]);
  const [willUpdate, setWillUpdate] = useState(false);
  const [filter, setFilter] = useState({
    ArticleTitlu: '',
    ArticleRezumat: '',
  });

  useEffect(async () => {
    var data = await get(routeGetArticles);
    setRows(data);
  }, [willUpdate]);
  useEffect(async () => {
    sessionStorage.clear();
  }, []);

  const onChangeFilter = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  const filterArticles = async () => {
    let data = await getQuery(
      routeGetArticlesFiltered,
      filter.ArticleTitlu,
      filter.ArticleRezumat
    );
    setRows(data);
  };
  const navigateToFormUpdateArticle = (id) => {
    sessionStorage.setItem('putScreen', true);
    sessionStorage.setItem('idArticle', id);
    navigate('/formArticle');
  };
  const navigateToFormAddArticle = () => {
    sessionStorage.setItem('putScreen', 'false');
    navigate('/formArticle');
  };

  const deleteArticle = async (id, index) => {
    await remove(routeDeleteArticle, id);

    rows.splice(index, 1);
    setRows(rows);
    setWillUpdate(!willUpdate);
  };

  const sortByTitle = async () => {
    let data = await get(routeGetArticlesSortedByTitle);
    setRows(data);
  };

  const sortByDate = async () => {
    let data = await get(routeGetArticlesSortedByDate);
    setRows(data);
  };

  const navigateToFormReference = (idArticle) => {
    sessionStorage.setItem('putScreen', 'false');
    sessionStorage.setItem('idArticle', idArticle);
    navigate('/formReference');
  };

  const navigateToReferences = (idArticle) => {
    sessionStorage.setItem('idArticle', idArticle);
    navigate('/references');
  };

  return (
    <div>
      <br />
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid item xs={3}>
          <Button
            color="primary"
            variant="contained"
            startIcon={<AddCircle />}
            onClick={() => navigateToFormAddArticle()}
          >
            New article
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            color="primary"
            variant="contained"
            startIcon={<ArrowUpward />}
            onClick={() => sortByTitle()}
          >
            Sort by title
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            color="primary"
            variant="contained"
            startIcon={<ArrowDownward />}
            onClick={() => sortByDate()}
          >
            Sort by date
          </Button>
        </Grid>
      </Grid>
      <br />
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="center">Title</TableCell>
              <TableCell align="center">Summary</TableCell>
              <TableCell align="center">Publication Date</TableCell>
              <TableCell align="center">References</TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={row.ArticleID}>
                <TableCell component="th" scope="row">
                  {row.ArticleID}
                </TableCell>
                <TableCell align="center">{row.ArticleTitlu}</TableCell>
                <TableCell align="center">{row.ArticleRezumat}</TableCell>
                <TableCell align="center">{row.ArticleData}</TableCell>
                <TableCell align="center">
                  <Button
                    color="primary"
                    variant="contained"
                    startIcon={<AddCircle />}
                    onClick={() => navigateToFormReference(row.ArticleID)}
                  >
                    New reference
                  </Button>
                  <br />
                  <br />
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => navigateToReferences(row.ArticleID)}
                  >
                    See references
                  </Button>
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => navigateToFormUpdateArticle(row.ArticleID)}
                  >
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteArticle(row.ArticleID, index)}
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
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={2}>
          <TextField
            margin="dense"
            id="ArticleTitlu"
            name="ArticleTitlu"
            label="Search by title"
            value={filter.ArticleTitlu}
            onChange={(e) => onChangeFilter(e)}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            margin="dense"
            id="ArticleRezumat"
            name="ArticleRezumat"
            label="Search by summary"
            value={filter.ArticleRezumat}
            onChange={(e) => onChangeFilter(e)}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            color="primary"
            variant="contained"
            onClick={() => filterArticles()}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}
