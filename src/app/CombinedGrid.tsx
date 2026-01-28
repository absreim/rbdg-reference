"use client";

import Grid, {
    ColDef,
    EditableTableFilterState, EditModel,
    FilterModel,
    GridPaginationState,
    RowDef, SingleSelectModel, SortColDef, TableSortModel, UpdateCallbackGenerator
} from "@absreim/react-bootstrap-data-grid";
import {FC, useMemo, useState} from "react";

const cols: ColDef[] = [
    {
        type: "number",
        name: "number",
        label: "Number",
        sortable: true,
    },
    {
        type: "string",
        name: "version",
        label: "Version",
    },
    {
        type: "date",
        name: "date",
        label: "Date",
        sortable: true,
    },
];

const initRows: RowDef[] = [
    {
        number: 8,
        version: "4.1.1.6758295",
        date: new Date("2025-04-15"),
    },
    {
        number: 7,
        version: "4.1.1.5849914",
        date: new Date("2024-09-05"),
    },
    {
        number: 6,
        version: "4.1.1.4763283",
        date: new Date("2024-02-16"),
    },
    {
        number: 5,
        version: "4.1.1.4061076",
        date: new Date("2023-11-30"),
    },
    {
        number: 4,
        version: "4.1.1.3882084",
        date: new Date("2023-11-02"),
    },
    {
        number: 3,
        version: "4.1.1.3732833",
        date: new Date("2023-09-22"),
    },
    {
        number: 2,
        version: "4.1.1.3686210",
        date: new Date("2023-08-31"),
    },
    {
        number: 1,
        version: "4.1.1.3669438",
        date: new Date("2023-08-25"),
    },
    {
        number: 0,
        version: "4.1.1.3622274",
        date: new Date("2023-08-03"),
    },
];

const CombinedGrid: FC = () => {
    const [rows, setRows] = useState<RowDef[]>(initRows.slice());
    const getUpdateCallback: UpdateCallbackGenerator =
        (origIndex) => (rowDef) => {
            const newRows = rows.slice();
            newRows[origIndex] = rowDef;
            setRows(newRows);
        };
    const getDeleteCallback: (origIndex: number) => () => void =
        (origIndex) => () => {
            if (window.confirm("Are you sure you want to delete this row?")) {
                setRows(rows.toSpliced(origIndex, 1));
            }
        };
    const editModel: EditModel = {
        getUpdateCallback,
        getDeleteCallback
    }

    const [tableFilterState, setTableFilterState] =
        useState<EditableTableFilterState>({
            number: {
                type: "number",
                scheme: "lessOrEqual",
                numValue: 7,
                enabled: true,
            },
            version: {
                type: "string",
                scheme: "startsWith",
                searchString: "4.1.1.3",
                enabled: false,
            },
            date: {
                type: "date",
                scheme: "startFrom",
                startDate: new Date("2023-08-15"),
                enabled: true,
            },
        });

    const filterModel: FilterModel = {tableFilterState, setTableFilterState};

    const [pageSizeIndex, setPageSizeIndex] = useState(0)
    const [pageNum, setPageNum] = useState(1)

    const paginationState: GridPaginationState = {
        pageSizeOptions: [5, 10],
        pageSizeIndex: pageSizeIndex,
        setPageSizeIndex: (pageSizeIndex) => setPageSizeIndex(pageSizeIndex),
        currentPage: pageNum,
        setCurrentPage: (pageNum) => setPageNum(pageNum),
        maxPageButtons: 5,
        componentSize: "medium"
    }

    const [sortColDef, setSortColDef] = useState<SortColDef | null>({
        name: "number",
        order: "desc",
    });

    const tableSortModel: TableSortModel = {
        sortColDef,
        setSortColDef,
    };

    const [selected, setSelected] = useState<number | null>(null);
    const selectModel: SingleSelectModel = useMemo(() => ({
        mode: "both",
        type: "single",
        selected,
        setSelected,
        groupName: "single selection example grid (BG3 cantrips)"
    }), [selected]);

    return <Grid rows={rows} cols={cols} filterModel={filterModel} pagination={paginationState}
                 sortModel={tableSortModel} selectModel={selectModel} editModel={editModel}/>;
};

export default CombinedGrid;
