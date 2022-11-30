import { useEffect, useState } from "react";
import "./App.css";
import { PokemonCard } from "./components/PokemonCard";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NavigationBar } from "./components/NavigationBar";
import { Form, Pagination, Spinner } from "react-bootstrap";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [endURL, setEndURL] = useState("");
  const [dataCount, setDataCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState("");

  const fetchPokemonData = async (pageURL) => {
    setLoading(true);
    // 全てのポケモンデータを取得
    let res = await getAllPokemon(pageURL);
    // 各ポケモンの詳細なデータを取得
    await loadPokemon(res.results);
    setDataCount(res.count);
    setPageCount(Math.floor(dataCount / limit));
    const endOffset = pageCount * limit;
    setEndURL(`${initialURL}?offset=${endOffset}&limit=${limit}`);
    setNextURL(res.next);
    setPrevURL(res.previous);
    setLoading(false);
  };

  // const offsetUrl = () => {
  //   setEndURL(`${initialURL}?offset=${offset}&limit=${limit}`);
  // };

  const changeLimit = (value) => {
    if (!value) return;
    setLimit(Number(value));
  };

  useEffect(() => {
    fetchPokemonData(`${initialURL}?limit=${limit}`);
  }, [limit]);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  const selectLimitValue = [5, 10, 20, 40, 60, 80, 100];

  return (
    <div className="App">
      <NavigationBar />
      {loading ? (
        <h1>
          Loading
          <Spinner animation="grow" />
        </h1>
      ) : (
        <Container>
          <Form.Group as={Row} className="mt-3">
            <Form.Label className="col-sm-2 col-form-label" htmlFor="limit">
              表示件数
            </Form.Label>
            <Col sm="2">
              <Form.Control
                as="select"
                id="limit"
                onChange={(e) => {
                  changeLimit(e.target.value);
                }}
              >
                {selectLimitValue.map((num) => {
                  return (
                    <option selected={limit === num} value={num}>
                      {num}
                    </option>
                  );
                })}
              </Form.Control>
            </Col>
          </Form.Group>
          <Row sm={5} className="my-3">
            {pokemonData.map((pokemon) => {
              return (
                <Col className="p-3">
                  <PokemonCard
                    key={pokemon.base_experience}
                    pokemon={pokemon}
                  />
                </Col>
              );
            })}
          </Row>
          <Pagination>
            <Pagination.First
              disabled={prevURL ? false : true}
              onClick={() => {
                fetchPokemonData(initialURL);
              }}
            />
            <Pagination.Prev
              disabled={prevURL ? false : true}
              onClick={() => {
                fetchPokemonData(prevURL);
              }}
            />
            {/* {Array.from({ length: pageCount }).map((_, i) =>
              i <= 10 ? <Pagination.Item>{i + 1}</Pagination.Item> : <></>
            )} */}
            {/* <Pagination.Ellipsis />

            <Pagination.Item active>{12}</Pagination.Item>

            <Pagination.Ellipsis />
            <Pagination.Item>{20}</Pagination.Item> */}
            <Pagination.Next
              disabled={nextURL ? false : true}
              onClick={() => {
                fetchPokemonData(nextURL);
              }}
            />
            <Pagination.Last
              disabled={nextURL ? false : true}
              onClick={() => {
                fetchPokemonData(endURL);
              }}
            />
          </Pagination>
        </Container>
      )}
    </div>
  );
}

export default App;
