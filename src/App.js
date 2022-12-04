import { useEffect, useState } from "react";
import "./App.css";
import { PokemonCard } from "./components/PokemonCard";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NavigationBar } from "./components/NavigationBar";
import { Form, Pagination } from "react-bootstrap";
import { Loading } from "./components/Loading";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextURL, setNextURL] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const [dataCount, setDataCount] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);
  const [endOffset, setEndOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPokemonData = async (offset) => {
    // ローディング開始
    setIsLoading(true);
    // ポケモンデータを取得
    const res = await getAllPokemon(
      `${initialURL}?offset=${offset}&limit=${limit}`
    );
    // 各ポケモンの詳細なデータを取得
    await loadPokemon(res.results);
    setDataCount(Number(res.count));
    setNextURL(res.next);
    setPrevURL(res.previous);
    setPageCount(Math.ceil(Number(dataCount / limit)));
    setEndOffset(Number((pageCount - 1) * limit));
    setOffset(offset);
    setCurrentPage(offset / limit + 1);
    // ローディング終了
    setIsLoading(false);
  };

  // const offsetUrl = () => {
  //   setEndURL(`${initialURL}?offset=${offset}&limit=${limit}`);
  // };

  // 表示件数変更
  const changeLimit = (value) => {
    if (!value) return;
    setLimit(Number(value));
  };

  // 初期表示時にポケモンデータ取得
  useEffect(() => {
    fetchPokemonData(0);
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
      {isLoading ? (
        <Loading />
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
                fetchPokemonData(0);
              }}
            />
            <Pagination.Prev
              disabled={prevURL ? false : true}
              onClick={() => {
                fetchPokemonData(offset - limit);
              }}
            />
            {Array.from({ length: pageCount }).map((_, i) =>
              i <= currentPage + 10 && i >= currentPage - 10 ? (
                <Pagination.Item
                  active={i + 1 === currentPage}
                  onClick={() => {
                    fetchPokemonData(limit * i);
                  }}
                >
                  {i + 1}
                </Pagination.Item>
              ) : i + 1 == 1 || i + 1 == pageCount ? (
                <Pagination.Ellipsis disabled />
              ) : (
                <></>
              )
            )}
            <Pagination.Next
              disabled={nextURL ? false : true}
              onClick={() => {
                fetchPokemonData(offset + limit);
              }}
            />
            <Pagination.Last
              disabled={nextURL ? false : true}
              onClick={() => {
                fetchPokemonData(endOffset);
              }}
            />
          </Pagination>
        </Container>
      )}
    </div>
  );
}

export default App;
