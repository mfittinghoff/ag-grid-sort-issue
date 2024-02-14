import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import 'ag-grid-enterprise';
import { ColDef, GridOptions, GridReadyEvent, IServerSideDatasource, IServerSideGetRowsParams } from 'ag-grid-community';
import { AgGridModule } from 'ag-grid-angular';


export type RowModel = {
  column1?: string;
  column2?: string;
  agg?: number;
};

export const col1: ColDef<RowModel, RowModel['column1']> = {
  floatingFilter: true,
  rowGroup: false,
  resizable: true,
  autoHeight: true,
  columnGroupShow: 'open',
  width: 200,
  useValueFormatterForExport: true,
  field: 'column1',
  headerName: 'Col 1',
  enableRowGroup: true,
  enablePivot: true,
  sortable: true,
  hide: false,
};

export const col2: ColDef<RowModel, RowModel['column2']> = {
  floatingFilter: true,
  rowGroup: false,
  resizable: true,
  autoHeight: true,
  columnGroupShow: 'open',
  width: 200,
  useValueFormatterForExport: true,
  field: 'column2',
  headerName: 'Col 2',
  enableRowGroup: true,
  enablePivot: true,
  sortable: true,
  sort: 'asc',
  hide: false,
};

export const colAgg: ColDef<RowModel, RowModel['agg']> = {
  floatingFilter: true,
  resizable: true,
  autoHeight: true,
  columnGroupShow: 'open',
  width: 200,
  useValueFormatterForExport: true,
  field: 'agg',
  headerName: 'Agg',
  hide: false,
  allowedAggFuncs: [
    'sum',
  ],
  defaultAggFunc: 'sum',
  enableValue: true,
  aggFunc: 'sum',
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AgGridModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  gridOptions: GridOptions<RowModel> = {
    rowModelType: 'serverSide',
    autoGroupColumnDef: {
      initialWidth: 400,
      resizable: true,
    },
    sideBar: {
      toolPanels: [
        'columns',
      ],
      defaultToolPanel: 'columns',
    },
    // animateRows: true,
    onGridReady: (event: GridReadyEvent<RowModel>) => {
      const dataSource: IServerSideDatasource = {
        getRows: (params) => this.handleRequest(params),
      };
      event.api.setServerSideDatasource(dataSource);
    },
    columnDefs: [
      col1, col2, colAgg,
    ],
  };


  handleRequest(params: IServerSideGetRowsParams): void {

    console.log('******NEW REQUEST*********');
    console.log(params);
    console.log('SortModel', params.request.sortModel)
    console.log('Sorted Columns from API', params.columnApi.getColumns()?.filter(c => c.isSorting()));

    const fakeResult1: RowModel = {
      column1: 'col1 res1',
      column2: 'col2 res2',
      agg: 99,
    };

    const fakeResult2: RowModel = {
      column1: 'col1 res2',
      column2: 'col2 res2',
      agg: 42,
    };
    // fake an empty response
    params.success({
      rowData: [
        fakeResult1,
        fakeResult2,
      ],
      rowCount: 2,
    });
  }
}
