import { BidHistory } from '../../api/user/types/bidHistory.ts';
import { displayListingStatus } from '../../utils/helpers/listings/listingStatus.ts';

export function createBidHistoryTable(
  bidHistory: BidHistory[],
): HTMLDivElement {
  const tableContainer: HTMLDivElement = document.createElement('div');
  tableContainer.className = 'container table-responsive   w-100';

  const table: HTMLTableElement = document.createElement('table');
  table.className = 'table w-100 table-striped';
  table.id = 'bid-history-table';

  const head: HTMLTableSectionElement = document.createElement('thead');
  head.className = 'head';

  const listingHeader: HTMLTableCellElement = document.createElement('th');
  listingHeader.className = 'header w-25 text-center ';
  listingHeader.scope = 'col';
  listingHeader.innerHTML = 'Listing';

  const titleHeader: HTMLTableCellElement = document.createElement('th');
  titleHeader.className = 'header w-25 text-center ';
  titleHeader.scope = 'col';
  titleHeader.innerHTML = 'Title';

  const amountHeader: HTMLTableCellElement = document.createElement('th');
  amountHeader.className = 'header w-25 text-center ';
  amountHeader.scope = 'col';
  amountHeader.innerHTML = 'Amount';

  const endsAtHeader: HTMLTableCellElement = document.createElement('th');
  endsAtHeader.className = 'header w-25 text-center ';
  endsAtHeader.scope = 'col';
  endsAtHeader.innerHTML = 'Last Call';

  const statusHeader: HTMLTableCellElement = document.createElement('th');
  statusHeader.className = 'header w-25 text-center ';
  statusHeader.scope = 'col';
  statusHeader.innerHTML = 'Status';

  head.appendChild(listingHeader);
  head.appendChild(titleHeader);
  head.appendChild(statusHeader);
  head.appendChild(amountHeader);
  head.appendChild(endsAtHeader);

  const tableBody: HTMLTableSectionElement = document.createElement('tbody');
  tableBody.className = 'body';
  tableBody.id = 'bid-history-table-body';

  bidHistory.forEach((bid: BidHistory): void => {
    const row: HTMLTableRowElement = document.createElement('tr');
    row.className = 'align-center';
    const listingCell: HTMLTableCellElement = document.createElement('td');
    listingCell.className = 'p-2 text-center';
    const listingImg: HTMLImageElement = document.createElement('img');
    listingImg.className = 'bid-table-icon rounded  ';
    listingImg.src = bid.listing.media[0].url;
    listingImg.alt = bid.listing.media[0].alt;

    listingCell.appendChild(listingImg);

    const titleCell: HTMLTableCellElement = document.createElement('td');
    titleCell.innerHTML = bid.listing.title;
    titleCell.className = 'text-center  p-2';

    const listingStatus: { status: string; className: string } =
      displayListingStatus(bid.listing.endsAt);

    const listingStatusSpan: HTMLSpanElement = document.createElement('span');
    listingStatusSpan.className = 'rounded  px-1 me-auto my-1 small-text';
    listingStatusSpan.id = 'status-badge';
    listingStatusSpan.classList.add(listingStatus.className);
    listingStatusSpan.innerHTML = listingStatus.status;

    const statusCell: HTMLTableCellElement = document.createElement('td');
    statusCell.className = 'text-center p-2';
    statusCell.appendChild(listingStatusSpan);

    const amountCell: HTMLTableCellElement = document.createElement('td');
    amountCell.innerHTML = bid.amount.toString();
    amountCell.className = 'text-center p-2';

    const endsAtCell: HTMLTableCellElement = document.createElement('td');
    const endingDate: string = new Date(
      bid.listing.endsAt,
    ).toLocaleDateString();
    endsAtCell.innerHTML = `${endingDate}`;
    endsAtCell.className = 'text-center  p-2';

    row.appendChild(listingCell);
    row.appendChild(titleCell);
    row.appendChild(statusCell);
    row.appendChild(amountCell);
    row.appendChild(endsAtCell);

    tableBody.appendChild(row);
  });

  table.appendChild(head);
  table.appendChild(tableBody);

  tableContainer.appendChild(table);

  return tableContainer;
}
