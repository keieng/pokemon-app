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
    setLimit(value);
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
          <Row className="my-3">
            <Form.Label className="col-sm-2 col-form-label" htmlFor="limit">
              表示件数
            </Form.Label>
            <Form.Select
              className="col-sm"
              id="limit"
              onChange={(e) => {
                changeLimit(e.target.value);
              }}
            >
              <option selected={limit == 5} value={5}>
                5
              </option>
              <option selected={limit == 10} value={10}>
                10
              </option>
              <option selected={limit == 20} value={20}>
                20
              </option>
              <option selected={limit == 40} value={40}>
                40
              </option>
              <option selected={limit == 60} value={60}>
                60
              </option>
              <option selected={limit == 80} value={80}>
                80
              </option>{" "}
              <option selected={limit == 80} value={100}>
                100
              </option>
            </Form.Select>
          </Row>

          <Row sm={5} className="g-4 my-3">
            {pokemonData.map((pokemon) => {
              return (
                <Col>
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
