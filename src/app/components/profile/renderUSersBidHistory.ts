import { BidHistory } from '../../api/user/types/bidHistory.ts';

export function createBidHistoryTable(
  bidHistory: BidHistory[],
): HTMLDivElement {
  const tableContainer = document.createElement('div');
  tableContainer.className = 'container table-responsive mx-auto  w-75';

  const table = document.createElement('table');
  table.className = 'table w-100 table-striped';
  table.id = 'bid-history-table';

  const head = document.createElement('thead');
  head.className = 'head';

  const listingHeader = document.createElement('th');
  listingHeader.className = 'header w-25 text-center ';
  listingHeader.scope = 'col';
  listingHeader.innerHTML = 'Listing';

  const titleHeader = document.createElement('th');
  titleHeader.className = 'header w-25 text-center ';
  titleHeader.scope = 'col';
  titleHeader.innerHTML = 'Title';

  const amountHeader = document.createElement('th');
  amountHeader.className = 'header w-25 text-center ';
  amountHeader.scope = 'col';
  amountHeader.innerHTML = 'Amount';

  const endsAtHeader = document.createElement('th');
  endsAtHeader.className = 'header w-25 text-center ';
  endsAtHeader.scope = 'col';
  endsAtHeader.innerHTML = 'Last Call';

  head.appendChild(listingHeader);
  head.appendChild(titleHeader);
  head.appendChild(amountHeader);
  head.appendChild(endsAtHeader);

  const tableBody = document.createElement('tbody');
  tableBody.className = 'body';
  tableBody.id = 'bid-history-table-body';

  bidHistory.forEach((bid) => {
    const row = document.createElement('tr');
    row.className = 'align-bottom';
    const listingCell = document.createElement('td');
    listingCell.className = 'p-2 text-center';
    const listingImg = document.createElement('img');
    listingImg.className = 'bid-table-icon rounded  ';
    listingImg.src = bid.listing.media[0].url;
    listingImg.alt = bid.listing.media[0].alt;

    listingCell.appendChild(listingImg);

    const titleCell = document.createElement('td');
    titleCell.innerHTML = bid.listing.title;
    titleCell.className = 'text-center  p-2';

    const amountCell = document.createElement('td');
    amountCell.innerHTML = bid.amount.toString();
    amountCell.className = 'text-center p-2';

    const endsAtCell = document.createElement('td');
    const endingDate = new Date(bid.listing.endsAt).toLocaleDateString();
    endsAtCell.innerHTML = `${endingDate}`;
    endsAtCell.className = 'text-center  p-2';

    row.appendChild(listingCell);
    row.appendChild(titleCell);
    row.appendChild(amountCell);
    row.appendChild(endsAtCell);

    tableBody.appendChild(row);
  });

  table.appendChild(head);
  table.appendChild(tableBody);

  tableContainer.appendChild(table);

  return tableContainer;
}
