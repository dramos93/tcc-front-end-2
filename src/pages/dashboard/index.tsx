import { Card, CardContent, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from '@mui/material';
import { GridColDef, GridColumnHeaderParams, GridRowHeightParams, GridRowsProp } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import React from 'react';
import Chart from "react-apexcharts";

const classes: string[] = ["2º Ano - Matutino", "2º Ano - Vespertino"];
const students: string[] = ["Daniel", "Abigail", "Catarina"];
const rounds: number[] = [1, 2, 3, 4, 5];



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
    const [classesSelected, setClassesSelected] = React.useState<string[]>([classes[0]]);
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
            <Grid container >
                <Grid
                    container
                    xs={4}
                    item
                    direction="column"
                    justifyContent="space-around"
                    alignItems="flex-end"
                    style={s}
                >
                    <FormControl >
                        <InputLabel>Turma</InputLabel>
                        <Select
                            // labelId="demo-simple-select-label"
                            // id="demo-simple-select"
                            value={classesSelected}
                            label="Turma"
                            onChange={handleChangeClasses}
                            // fullWidth
                            style={{ width: 400 }}
                            name='Name'
                            placeholder='Da'


                        >
                            {classes.map(c => (
                                <MenuItem key={c} value={c}>{c}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
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
                            style={{ width: 400 }}
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
                            style={{ width: 400 }}
                        >
                            {rounds.map(c => (
                                <MenuItem key={c} value={c}>{c}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Card style={{ width: 400, height: 80, }}>
                        <CardContent style={{ padding: 8, textAlign: 'center' }}>
                            <InputLabel sx={{ fontSize: 12, }} >
                                MÉDIA DE ERROS POR RODADA
                            </InputLabel>
                            <Typography sx={{ fontSize: 36 }}>
                                14
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card style={{ width: 400, height: 80 }} >
                        <CardContent style={{ padding: 8, textAlign: 'center' }}>
                            <InputLabel sx={{ fontSize: 12 }} >
                                RODADAS COMPLETAS
                            </InputLabel>
                            <Typography sx={{ fontSize: 36 }}>
                                14
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid container item xs={8} style={s}>
                    {/* Possível biblioteca para usar nos gráficos: https://formidable.com/open-source/victory/guides/events#external-event-mutations
                    <VictoryChart width={600}  domain={{ x: [0, 5] }}
                        // externalEventMutations={this.state.externalMutations}
                        events={[
                            {
                                target: "data",
                                childName: "Bar-2",
                                eventHandlers: {
                                    onClick: (e) => {
                                        // console.log(e);
                                        return (
                                            {
                                                target: "data",
                                                mutation: () => ({ style: { fill: "orange" } })
                                            });
                                    }
                                }
                            }
                        ]}
                    >
                        <VictoryBar name="Bar-2"
                            style={{ data: { fill: "grey" } }}
                            labels={(e) => console.log(e)}
                            width={50}
                            // theme={function a(x){return x}}
                            data={[
                                { x: 1, y: 5 },
                                { x: 2, y: 4 },
                                { x: 3, y: 3 },
                                { x: 4, y: 2 }
                            ]}
                        />
                    </VictoryChart> */}
                    <Chart
                        options={{
                            chart: {
                                id: "basic-bar"
                            },
                            xaxis: {
                                categories: [1, 2, 3, 4, 5, 6, 7, 8],
                                title: {
                                    text: 'Rodada'
                                }
                            },
                            yaxis: {
                                title: {
                                    text: 'Quantidade de Erros'
                                }
                            }
                        }}
                        series={
                            [{
                                name: "series-1",
                                data: [57, 56, 54, 50, 49, 60, 49, 41]
                            }]
                        }
                        type="bar"
                        width="800"
                        height={400}
                    />

                </Grid>
            </Grid>
            <Grid container>
                <Grid
                    container
                    item
                    xs={4}
                    // style={{...s, width: 400}}
                    direction="column"
                    justifyContent="space-around"
                    alignItems="flex-end">
                    <div style={{ ...s, width: 400 }}>
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
                    <Chart options={{
                        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
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
                            text: "Título",
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
                        series={[10, 23, 30, 41, 59, 60, 71, 89, 90, 108]}
                        type="polarArea"
                        width="600" />
                </Grid>
            </Grid>

        </Grid>
    );
}