import "./style.css";
import PaginatePageButton from "../../molecul/paginate-page-button/PaginatePageButton";
import calculatePaginationRenderPage from "../../../helpers/calculatePaginationRenderPage";
import ActionButton from "../../atom/action-button/ActionButton";
import FlexColumnCenter from "../../atom/flex-column-center/FlexColumnCenter";

interface PaginateComponent {
  dublicate?: boolean;
  pageActive?: number;
  pages?: number;
  setPageActive?: (value: number) => void;
  setPreviousPage?: () => void;
  setNextPage?: (totalPages?: number) => void;
  addItemsPerPage?: (itemsPerPage?: number) => void;
}

export default function Paginate({
  dublicate = false,
  pageActive = 1,
  pages = 20,
  setPageActive = () => {},
  addItemsPerPage = undefined,
}: PaginateComponent) {
  if (pages < 2) return null;
  const pageActiveRender = pageActive;
  const renderPages = calculatePaginationRenderPage(pageActiveRender, pages);
  return (
    <FlexColumnCenter>
      <div className='paginate'>
        {renderPages.map((pageNumber: number | string, index) => {
          if (typeof pageNumber == "string")
            return (
              <div className='paginate-dots' key={pageNumber + index}>
                ..
              </div>
            );
          if (typeof pageNumber == "number")
            return (
              <PaginatePageButton
                dublicate={dublicate}
                key={pageNumber}
                pageNumber={pageNumber}
                action={() => setPageActive(pageNumber)}
                pageActive={pageActiveRender}
              />
            );
        })}
      </div>
      {addItemsPerPage ? (
        <div className='add-to-page'>
          <ActionButton actionWithPayload={addItemsPerPage}>
            add to page
          </ActionButton>
        </div>
      ) : null}
    </FlexColumnCenter>
  );
}
