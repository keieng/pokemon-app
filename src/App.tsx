import { useEffect, useState } from "react";
import { PokemonCard } from "./components/PokemonCard";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { NavigationBar } from "./components/NavigationBar";
import { Form } from "react-bootstrap";
import { Loading } from "./components/Loading";
import { PaginationArea } from "./components/PaginationArea";
import PokeAPI, { INamedApiResource, IPokemon } from "pokeapi-typescript";

function App() {
  // ポケモンの詳細データの配列
  const [pokemonData, setPokemonData] =
    useState<Array<{ jaName: string; data: IPokemon }>>();
  // ポケモンデータリストのoffset
  const [offset, setOffset] = useState<number>(0);
  // ポケモンデータリストのlimit
  const [limit, setLimit] = useState<number>(10);
  // ローディング状態管理
  const [isLoading, setIsLoading] = useState<boolean>(true);
  // 次のページがあるかの判定
  const [isNextPage, setIsNextPage] = useState<boolean>(false);
  // 前のページがあるかの判定
  const [isPrevPage, setIsPrevPage] = useState<boolean>(false);
  // ポケモンデータリストの全ページ数
  const [pageCount, setPageCount] = useState<number>(0);
  // ポケモンデータリストの現在のページ
  const [currentPage, setCurrentPage] = useState<number>(1);
  // 表示件数の候補
  const selectLimitValue: number[] = [5, 10, 20, 40, 60, 80, 100];

  /**
   * ポケモンデータリストを取得
   * @param offset
   */
  const fetchPokemonData = async (offset: number) => {
    setIsLoading(true);
    // ポケモンデータリストを取得
    const resourceList = await PokeAPI.Pokemon.list(limit, offset);
    await loadPokemon(resourceList.results);
    setIsNextPage(resourceList.next != null);
    setIsPrevPage(resourceList.previous != null);
    setPageCount(Math.ceil(Number(resourceList.count / limit)));
    setOffset(offset);
    setCurrentPage(offset / limit + 1);
    setIsLoading(false);
  };

  /**
   *  ポケモンの詳細なデータを取得
   * @param data
   */
  const loadPokemon = async (data: INamedApiResource<IPokemon>[]) => {
    const pokemonRecordArray: Array<IPokemon> = await Promise.all(
      data.map((pokemon) => {
        const pokemonRecord = PokeAPI.Pokemon.fetch(pokemon.name);
        return pokemonRecord;
      })
    );
    const pokemonRecordLocalizeArray = await Promise.all(
      pokemonRecordArray.map(async (pokemon) => {
        const localizeName = await localizePokemonName(pokemon.name);
        const localizeData = {
          jaName: localizeName,
          data: pokemon,
        };
        return localizeData;
      })
    );
    setPokemonData(pokemonRecordLocalizeArray);
  };

  /**
   * 表示件数変更
   */
  const changeLimit = (value: string) => {
    if (!value) return;
    setLimit(Number(value));
  };

  /**
   * ポケモンの名前の日本語を返す
   * @param pokemonName
   * @returns
   */
  const localizePokemonName = async (pokemonName: string) => {
    const pokemonSpacies = await PokeAPI.PokemonSpecies.fetch(pokemonName);
    return pokemonSpacies.names[0].name;
  };

  /**
   * 初期表示時にポケモンデータ取得
   */
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
            {pokemonData &&
              pokemonData.map((pokemon) => {
                return (
                  <Col className="p-3">
                    <PokemonCard
                      key={pokemon.data.base_experience}
                      pokemon={pokemon.data}
                      pokemonNameJa={pokemon.jaName}
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
