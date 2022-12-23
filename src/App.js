import { useEffect, useState } from "react";
import { PokemonCard } from "./components/PokemonCard";
import { getAllPokemon, getPokemon } from "./utils/pokemon";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NavigationBar } from "./components/NavigationBar";
import { Form, Pagination } from "react-bootstrap";
import { Loading } from "./components/Loading";
import { PaginationArea } from "./components/PaginationArea";

function App() {
  const initialURL = "https://pokeapi.co/api/v2/pokemon";
  const lnitialLimit = 10;
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(lnitialLimit);
  const [isLoading, setIsLoading] = useState(true);
  const [isNextPage, setIsNextPage] = useState(false);
  const [isPrevPage, setIsPrevPage] = useState(false);
  const [pageCount, setPageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const selectLimitValue = [5, 10, 20, 40, 60, 80, 100];

  const fetchPokemonData = async (offset) => {
    // ローディング開始
    setIsLoading(true);
    // ポケモンデータを取得
    const res = await getAllPokemon(
      `${initialURL}?offset=${offset}&limit=${limit}`
    );
    // 各ポケモンの詳細なデータを取得
    await loadPokemon(res.results);
    // 次のページがあるかの判断
    setIsNextPage(res.next != null);
    // 前のページがあるかの判断
    setIsPrevPage(res.previous != null);
    // ページ数の設定
    setPageCount(Math.ceil(Number(res.count / limit)));
    // 現在のoffsetを設定
    setOffset(offset);
    // 現在のページを設定
    setCurrentPage(offset / limit + 1);
    // ローディング終了
    setIsLoading(false);
  };

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        let pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  // 表示件数変更
  const changeLimit = (value) => {
    if (!value) return;
    setLimit(Number(value));
  };

  // 初期表示時にポケモンデータ取得
  useEffect(() => {
    fetchPokemonData(0);
  }, [limit]);

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
          <PaginationArea
            fetchPokemonData={fetchPokemonData}
            isPrevPage={isPrevPage}
            isNextPage={isNextPage}
            currentPage={currentPage}
            pageCount={pageCount}
            offset={offset}
            limit={limit}
          />
        </Container>
      )}
    </div>
  );
}

export default App;
