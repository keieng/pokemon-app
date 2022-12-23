import { Pagination } from "react-bootstrap";

interface Props {
  isPrevPage: boolean;
  isNextPage: boolean;
  currentPage: number;
  pageCount: number;
  offset: number;
  limit: number;
  fetchPokemonData: Function;
}

export const PaginationArea = (props: Props) => {
  return (
    <Pagination>
      <Pagination.First
        disabled={!props.isPrevPage}
        onClick={() => {
          props.fetchPokemonData(0);
        }}
      />
      <Pagination.Prev
        disabled={!props.isPrevPage}
        onClick={() => {
          props.fetchPokemonData(props.offset - props.limit);
        }}
      />
      {Array.from({ length: props.pageCount }).map((_, i) =>
        i <= props.currentPage + 10 && i >= props.currentPage - 10 ? (
          <Pagination.Item
            key={i}
            active={i + 1 === props.currentPage}
            onClick={() => {
              props.fetchPokemonData(props.limit * i);
            }}
          >
            {i + 1}
          </Pagination.Item>
        ) : i + 1 === 1 || i + 1 === props.pageCount ? (
          <Pagination.Ellipsis disabled />
        ) : (
          <></>
        )
      )}
      <Pagination.Next
        disabled={!props.isNextPage}
        onClick={() => {
          props.fetchPokemonData(props.offset + props.limit);
        }}
      />
      <Pagination.Last
        disabled={!props.isNextPage}
        onClick={() => {
          props.fetchPokemonData(Number((props.pageCount - 1) * props.limit));
        }}
      />
    </Pagination>
  );
};
