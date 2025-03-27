import { DataGrid } from "@mui/x-data-grid";
import { darkTheme } from "../../utils/Themes";
import { Paper, TableContainer, ThemeProvider } from "@mui/material";

const DataTable = ({ title, columns, data, selectedRows, setSelectedRows }) => {

    return (
        <ThemeProvider theme={darkTheme}>
            <TableContainer component={Paper}>
                <h2 style={{
                    textAlign: "center",
                    color: "white",
                    backgroundColor: "black",
                    padding: "10px",
                    margin: 0
                }}>{title}</h2>
                <DataGrid
                    rows={data}
                    columns={columns}
                    checkboxSelection
                    onRowSelectionModelChange={(newRowSelectionModel) => {
                        setSelectedRows(newRowSelectionModel);
                    }}
                    rowSelectionModel={selectedRows}
                    pageSizeOptions={[5, 10, 20, 100]}
                />
            </TableContainer>
        </ThemeProvider>
    );
};

export const ExerciseTable = ({ exercises, selectedRows, setSelectedRows }) => (

    <DataTable
        title="Exercises"
        columns={[
            {
                field: "id",
                headerName: "ID"
            },
            {
                field: "name",
                headerName: "Name",
                width: 500
            },
            {
                field: "cues",
                headerName: "Cues",
                width: 500
            }
            ]}
        data={exercises}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
    />
);

export const WorkoutTable = ({ workouts, selectedRows, setSelectedRows }) => (

    <DataTable
        title="Workouts"
        columns={[
            {
                field: "id",
                headerName: "ID"
            },
            {
                field: "name",
                headerName: "Name"
            },
            {
                field: "exercises",
                headerName: "Exercises",
                width: 1000,
                renderCell: ({ row }) => row.exercises?.map(e => e.name).join(", ") || "No Exercises"
            }
        ]}
        data={workouts}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
    />
);

export const SessionTable = ({ sessions, selectedRows, setSelectedRows }) => (
    <DataTable
        title="Workout Sessions"
        columns={[
            {
                field: "id",
                headerName: "ID"
            },
            {
                field: "user",
                headerName: "User"
            },
            {
                field: "date",
                headerName: "Date",
            },
            {
                field: "workout",
                headerName: "Workout",
                renderCell: ({ row }) => row.workout.name
            },
            {
                field: "notes",
                headerName: "Notes",
                width: 1000
            }
        ]}
        data={sessions}
        selectedRows={selectedRows}
        setSelectedRows={setSelectedRows}
    />
);

export const WorkingSetTable = ({ workingSets }) => (
    <DataTable
        title="Working Sets"
        columns={[
            { field: "id", headerName: "ID" },
            { field: "number", headerName: "Set Number" },
            { field: "weight", headerName: "Weight (kg)" },
            { field: "repetitions", headerName: "Reps" },
            {
                field: "exercise",
                headerName: "Exercise",
                renderCell: ({ row }) => row.exercise?.name || "No Exercise"
            }
        ]}
        data={workingSets}
    />
);