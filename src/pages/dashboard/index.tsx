import { Card, CardContent, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { GridColDef, GridColumnHeaderParams, GridRowsProp } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import React from 'react';
import Chart from "react-apexcharts";

const virDoBanco = [
    {
        class: "2º Ano Matutino",
        students: [
            {
                name: 'Daniel',
                rounds: [
                    {
                        round: 1,
                        resultsRounds: [
                            { table: 1, sum_errors: 1 },
                            { table: 2, sum_errors: 7 },
                            { table: 3, sum_errors: 5 }]
                    }]
            }]
    },
    {
        class: "2º Ano Vespertino",
        students: [
            {
                name: 'Abigail',
                rounds: [
                    {
                        round: 1, resultsRounds: [
                            { table: 1, sum_errors: 1 },
                            { table: 2, sum_errors: 4 },
                            { table: 3, sum_errors: 3 }]
                    },
                    {
                        round: 2, resultsRounds: [
                            { table: 1, sum_errors: 0 },
                            { table: 2, sum_errors: 2 },
                            { table: 3, sum_errors: 3 }]
                    }]
            },
            {
                name: 'Catarina',
                rounds: [
                    {
                        round: 1, resultsRounds: [
                            { table: 1, sum_errors: 1 },
                            { table: 2, sum_errors: 5 },
                            { table: 3, sum_errors: 8 }]
                    },
                    {
                        round: 2, resultsRounds: [
                            { table: 1, sum_errors: 0 },
                            { table: 2, sum_errors: 4 },
                            { table: 3, sum_errors: 6 }]
                    }]
            }]
    }
];

function getClasses() {
    return virDoBanco.map(b => b.class);
}

const classes: string[] = ["2º Ano - Matutino", "2º Ano - Vespertino"];
const students: string[] = ["Daniel", "Abigail", "Catarina"];
const rounds: number[] = [1, 2, 3, 4, 5];
const errorsFromRounds: object = { Primeiro: 10, Segundo: 20, Terceiro: 45 };

// O dado deve vir do banco em ordem de quantidade de maior erro primeiro.
const rows: GridRowsProp = [
    { id: 1, table: 1, errors: 10, },
    { id: 2, table: 2, errors: 20 },
    { id: 3, table: 3, errors: 30 },
    { id: 4, table: 4, errors: 12 },
    { id: 5, table: 5, errors: 5 },
    { id: 6, table: 6, errors: 6 },
    { id: 7, table: 7, errors: 18 },
    { id: 8, table: 8, errors: 23 },
    { id: 9, table: 9, errors: 26 },
    { id: 10, table: 10, errors: 18 },
];

const columns: GridColDef[] = [
    {
        field: 'table',
        flex: 0.5,
        align: 'center',
        headerAlign: 'center',
        renderHeader: (params: GridColumnHeaderParams) => (
            <strong>Tabuada</strong>),
    },
    {
        field: 'errors',
        flex: 0.5,
        align: 'center',
        headerAlign: 'center',
        renderHeader: (params: GridColumnHeaderParams) => (
            <strong>Quantidade de Erros</strong>)
    },
];

export default function Dashboard() {
    const [classesSelected, setClassesSelected] = React.useState<string[]>([getClasses()[0]]);
    const [studentSelected, setStudentSelected] = React.useState<string[]>(students);
    const [roundSelected, setRoundSelected] = React.useState<number[]>(rounds);

    const handleChangeClasses = (event: SelectChangeEvent<any>) => {
        setClassesSelected(event.target?.value);
    };

    const handleChangeStudents = (event: SelectChangeEvent<any>) => {
        setStudentSelected(event?.target?.value);
    };

    const handleChangeRound = (event: SelectChangeEvent<any>) => {
        setRoundSelected(event.target?.value);
    };
    const s = { 'height': 400, backgroundColor: '#ffffff', padding: 8 };

    return (
        <Grid container>
            <Grid container item>
                <Grid
                    style={{ padding: 8 }}
                    container
                    xs={4}
                    item
                    direction="column"
                    justifyContent="space-around"

                >
                    <FormControl>
                        <InputLabel>Turma</InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            value={classesSelected}
                            label="Turma"
                            onChange={handleChangeClasses}
                            // fullWidth
                            name='Name'
                            placeholder='Da'
                        // defaultValue={classesSelected[0]}
                        // renderValue={classesSelected[0]}


                        >
                            {classes.map(c => (
                                <MenuItem key={c} value={c}>{c}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl >
                        <InputLabel>Alunos</InputLabel>
                        <Select
                            // id="demo-multiple-checkbox"
                            value={studentSelected}
                            label="Alunos"
                            onChange={handleChangeStudents}
                            renderValue={(selected) => selected.join(', ')}
                            multiple
                        // input={<OutlinedInput label="Tag" />}
                        // fullWidth
                        // MenuProps={MenuProps} //Aqui vai os props de largura, etc.
                        >
                            {students.map((student) => (
                                <MenuItem key={student} value={student}>
                                    <Checkbox checked={studentSelected.indexOf(student) > -1} />
                                    <ListItemText primary={student} />
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel>Rodadas</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={roundSelected}
                            label="Rodadas"
                            onChange={handleChangeRound}
                            multiple
                        // input={<OutlinedInput label="Tag" />}
                        // fullWidth
                        >
                            {rounds.map(c => (
                                <MenuItem key={c} value={c}>{c}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <Card>
                            <CardContent style={{ padding: 6 }}>
                                <Typography variant="subtitle2" textAlign='center'>
                                    MÉDIA DE ERROS POR RODADA
                                </Typography>
                                <Typography variant='h3' textAlign='center'>
                                    14
                                </Typography>
                            </CardContent>
                        </Card>
                    </FormControl>
                    <FormControl>
                        <Card>
                            <CardContent style={{ padding: 6 }}>
                                <Typography variant="subtitle2" textAlign='center'>
                                    RODADAS COMPLETAS
                                </Typography>
                                <Typography variant='h3' textAlign='center'>
                                    16
                                </Typography>
                            </CardContent>
                        </Card>
                    </FormControl>
                </Grid>
                <Grid container item xs={8} style={s}>
                    <Card style={{ width: "100%", height: "100%" }}>
                        <Chart
                            options={{
                                chart: {
                                    id: "basic-bar",
                                    type: 'bar'
                                },
                                xaxis: {
                                    title: {
                                        text: 'Rodada'
                                    },
                                    categories: Object.keys(errorsFromRounds)
                                },
                                yaxis: {
                                    title: {
                                        text: 'Quantidade de Erros'
                                    }
                                },
                                // }}
                            }}
                            series={[{
                                data: Object.values(errorsFromRounds)
                            }]}
                            // series={
                            //     [{
                            //         name: "series-1",
                            //         data: [57, 56, 54, 50, 49, 60, 49, 41]
                            //     }]
                            // }

                            // serie={errorsFromRounds}
                            type="bar"
                            height="100%"
                        // style={{ backgroundColor: '#fafafa' }}
                        />
                    </Card>
                </Grid>
            </Grid>
            <Grid container>
                <Grid
                    container
                    item
                    xs={4}
                    direction="column"
                    justifyContent="space-around"
                    alignItems="flex-end"
                    style={{ padding: 8 }}>
                    <div
                        style={{ height: '100%', width: '100%' }}
                    >
                        <DataGrid
                            rows={rows}
                            columns={columns}
                            density="compact"
                            hideFooter
                            rowHeight={50}
                            // getRowHeight={({ id, densityFactor }: GridRowHeightParams) => {
                            //     if ((id as number) % 2 === 0) {
                            //         return 100 * densityFactor;
                            //     }

                            //     return null;
                            // }}
                            // getEstimatedRowHeight={() => 'auto'}
                            // row
                            // pageSizeOptions={[20]}
                            // paginationMode="server"
                            // disableRowSelectionOnClick
                            onCellClick={v => console.log(v)}
                        />
                    </div>
                </Grid>
                <Grid container item xs={8} style={s} >
                    <Card style={{ width: "100%", height: "100%" }}>
                        <Chart
                            options={{
                                labels: rows.map(r => `Tabuada de ${r.table}`),
                                chart: {
                                    type: 'polarArea',
                                },
                                stroke: {
                                    colors: ['#fff']
                                },
                                fill: {
                                    opacity: 0.8
                                },
                                legend: { position: 'left' },
                                title: {
                                    text: "Número de Erros por tabuada",
                                    align: "center"
                                },
                                responsive: [{
                                    breakpoint: 480,
                                    options: {
                                        chart: {
                                            width: 200
                                        },
                                        legend: {
                                            position: 'bottom'
                                        }
                                    }
                                }]
                            }}
                            series={rows.map(r => r.errors)}
                            type="polarArea"
                            // width="100%"
                            height="100%"
                        // style={{ backgroundColor: '#fafafa' }}
                        />
                    </Card>
                </Grid>
            </Grid>

        </Grid >
    );
}