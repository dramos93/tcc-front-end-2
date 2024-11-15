import { Button, Card, CardContent, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { GridColDef, GridColumnHeaderParams, GridRowsProp } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import React from 'react';
import Chart from "react-apexcharts";
import { Rounds, Student, virDoBanco } from './example';

const firstClassSelected: string = virDoBanco.map(c => c.className)[0];
const firstStudentsSelecteds: string[] = getStudentsFromDB(firstClassSelected).map(s => s.name);
const classes: string[] = virDoBanco.map(c => c.className);

interface StudentTableInterface {
    'id': string,
    'name': string,
    'sum_errors': number;
}

// O dado deve vir do banco em ordem de quantidade de maior erro primeiro.
function studentTable(students: Student[], roundSelected: number[]): GridRowsProp {
    const studentTable: StudentTableInterface[] = students
        .map(student => {
            return {
                'id': student.name,
                'name': student.name,
                'sum_errors': student
                    .rounds
                    .filter(r => roundSelected.some(rr => r.round === rr))
                    .map(rs => rs.sum_of_round_errors)
                    .reduce((previousValue, currentValue) => previousValue += currentValue, 0)
            };
        });

    studentTable.sort(function (a, b): number {
        if (a.sum_errors < b.sum_errors) return 1;
        if (a.sum_errors > b.sum_errors) return -1;
        return 0;
    });

    return studentTable;
}

function barData(students: Student[], studentsSelecteds: string[], roundSelected: number[]) {
    const studentFilteredBySelecteds: Student[] = students.filter(student => studentsSelecteds.some(ss => ss === student.name));
    const rounds: Rounds[] = studentFilteredBySelecteds.flatMap(student => student.rounds);
    const roundsTable: object | any = {};

    rounds.forEach((r: Rounds) => {
        const roundKey = `${r.round}ª Rodada`;//Aqui a lógica não está dando certo.
        if (Object.keys(roundsTable).some(rt => rt === roundKey)) {
            if (roundsTable !== undefined)
                roundsTable[roundKey] += r.sum_of_round_errors;
        } else
            roundsTable[roundKey] = r.sum_of_round_errors;
    });

    return roundsTable;
}

function polarData(students: Student[], studentsSelecteds: string[], roundSelected: number[]) {
    const studentFilteredBySelecteds: Student[] = students.filter(student => studentsSelecteds.some(ss => ss === student.name));
    const roundsFilteredByRound = studentFilteredBySelecteds.flatMap(x => x.rounds).filter(r => roundSelected.some(rs => rs === r.round));
    const tablesSelecteds = roundsFilteredByRound.flatMap(r => r.resultsRounds);
    const tables: object | any = {};

    tablesSelecteds.forEach((r) => {
        const roundKey = `Tabuada ${r.table}`;//Aqui a lógica não está dando certo.
        if (Object.keys(tables).some(rt => rt === roundKey)) {
            if (tables !== undefined)
                tables[roundKey] += r.errors;
        } else
            tables[roundKey] = r.errors;
    });

    return tables;
}


const columns: GridColDef[] = [
    {
        field: 'name',
        flex: 0.5,
        align: 'center',
        headerAlign: 'center',
        renderHeader: (params: GridColumnHeaderParams) => (
            <strong>Nome do Aluno</strong>),
    },
    {
        field: 'sum_errors',
        flex: 0.5,
        align: 'center',
        headerAlign: 'center',
        renderHeader: (params: GridColumnHeaderParams) => (
            <strong>Soma de Erros</strong>)
    },
];

function getStudentsFromDB(className: string): Student[] {
    // Aqui vai a doc
    return virDoBanco.filter(b => b.className === className).flatMap(y => y.students);

}

function getStudentsSelecteds(classSelected: string): string[] {

    return getStudentsFromDB(classSelected).map(s => s.name);
}

function getBarsDistinct(classSelected: string): number[] {

    const allRounds: number[] = getStudentsFromDB(classSelected).flatMap(r => r.rounds).flatMap(r => r.round);

    return Array.from(new Set(allRounds).keys());
}

const s = { 'height': 400, backgroundColor: '#ffffff', padding: 8 };

const changeRound = (students: Student[], studentSelected: string[], roundDistinct: number[]) => {
    const studentsArray: Student[] = students.filter(s => studentSelected.some(ss => ss === s.name));
    const allRoundsSelected: Rounds[] = studentsArray.flatMap(sa => sa.rounds);
    const sumRoundsDistinct = roundDistinct.map(round => ({
        round,
        average_sum_of_round_errors: allRoundsSelected
            .filter(item => item.round === round)
            .reduce((total, item) => total + item.sum_of_round_errors, 0) /
            allRoundsSelected.filter(item => item.round === round).length
    }));

    const sumAllRounds: number = sumRoundsDistinct.reduce((total, item) => total += item['average_sum_of_round_errors'], 0);
    return roundDistinct.length && sumAllRounds / roundDistinct.length;
};

export default function Dashboard() {
    const [classSelected, setClassSelected] = React.useState<string>(firstClassSelected);
    const [studentsSelecteds, setStudentsSelecteds] = React.useState<string[]>(firstStudentsSelecteds);
    const [roundSelected, setRoundSelected] = React.useState<number[]>(getBarsDistinct(firstClassSelected));
    const [students, setStudents] = React.useState<Student[]>(getStudentsFromDB(firstClassSelected));
    const [roundDistinct, setRoundDistinct] = React.useState<number[]>(getBarsDistinct(firstClassSelected));
    const [averageErrors, setAverageErrors] = React.useState<number>(
        changeRound(
            getStudentsFromDB(firstClassSelected),
            firstStudentsSelecteds,
            getBarsDistinct(firstClassSelected)
        ));

    const handleChangeClasses = (event: SelectChangeEvent<any>) => {
        const classSelected: string = event?.target?.value;

        const studentsFromDB: Student[] = getStudentsFromDB(classSelected);
        setStudents(studentsFromDB);

        const roundDistinct: number[] = getBarsDistinct(classSelected);
        setRoundDistinct(roundDistinct);
        setRoundSelected(roundDistinct);


        const studentSelecteds: string[] = getStudentsSelecteds(classSelected);
        setAverageErrors(
            changeRound(studentsFromDB, studentSelecteds, roundDistinct)
        );

        setClassSelected(classSelected);
        setStudentsSelecteds(studentSelecteds);

    };

    const handleChangeStudents = (event: SelectChangeEvent<any>) => {
        const selectedStudents: string[] = event?.target?.value;

        if (selectedStudents.length !== 0) {
            setStudentsSelecteds(selectedStudents);
            const studentSelectedArray: Student[] = students.filter(s => selectedStudents.some(v => s.name === v));
            const studentsRounds: number[] = studentSelectedArray.flatMap(r => r.rounds).flatMap(r => r.round);
            const roundsDistinctFromDB: number[] = Array.from(new Set(studentsRounds).keys());
            setRoundDistinct(roundsDistinctFromDB);
            setRoundSelected(roundsDistinctFromDB);
            setAverageErrors(
                changeRound(
                    students,
                    selectedStudents,
                    roundsDistinctFromDB
                )
            );
        }
    };

    const handleChangeRound = (event: SelectChangeEvent<any>) => {
        const rounds: number[] = event?.target?.value;

        if (rounds.length !== 0) {
            setRoundSelected(rounds);
            setAverageErrors(changeRound(students, studentsSelecteds, rounds));
        }
    };

    function getBarData(): object {
        return barData(students, studentsSelecteds, roundSelected);
    };

    function getPolarData(): object {
        return polarData(students, studentsSelecteds, roundSelected);
    }


    return (
        <Grid container>
            <Button onClick={
                () => {
                    polarData(students, studentsSelecteds, roundSelected);
                    // console.log(Object.values(errorsFromRounds));


                }
            }>
                APERTE AQUI
            </Button>
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
                            value={classSelected}
                            // defaultValue={classSelected.map(c => c.className)}
                            label="Turma"
                            onChange={handleChangeClasses}
                        // fullWidth
                        // defaultValue={classSelected[0]}
                        // renderValue={classSelected[0]}


                        >
                            {/* .map(c => c.className) */}
                            {classes.map(c => (
                                <MenuItem key={c} value={c}>{c}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl >
                        <InputLabel>Alunos</InputLabel>
                        <Select
                            // id="demo-multiple-checkbox"
                            value={studentsSelecteds}
                            label="Alunos"
                            onChange={handleChangeStudents}
                            renderValue={(selected) => selected.join(', ')}
                            multiple
                        // input={<OutlinedInput label="Tag" />}
                        // fullWidth
                        // MenuProps={MenuProps} //Aqui vai os props de largura, etc.
                        >
                            {students?.map((student) => (
                                <MenuItem key={student.name} value={student.name}>
                                    <Checkbox checked={studentsSelecteds.indexOf(student.name) > -1} />
                                    <ListItemText primary={student.name} />
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
                            {roundDistinct.map(c => (
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
                                    {averageErrors.toFixed(2)}
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
                                    {roundDistinct.length}
                                </Typography>
                            </CardContent>
                        </Card>
                    </FormControl>
                </Grid>
                <Grid container item xs={8} style={s}>
                    <Card style={{ width: "100%", height: "100%" }}>
                        <Chart
                            type="bar"
                            height="100%"
                            series={[{
                                data: Object.values(getBarData())
                            }]}
                            options={{
                                chart: {
                                    id: "basic-bar",
                                    type: 'bar'
                                },
                                xaxis: {
                                    title: {
                                        text: 'Rodada'
                                    },
                                    categories: Object.keys(getBarData())
                                },
                                yaxis: {
                                    title: {
                                        text: 'Quantidade de Erros'
                                    }
                                },
                            }}
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
                            rows={studentTable(students, roundSelected)}
                            columns={columns}
                            density="compact"
                            hideFooter
                            rowHeight={50}
                            rowSelection={false}
                        />
                    </div>
                </Grid>
                <Grid container item xs={8} style={s} >
                    <Card style={{ width: "100%", height: "100%" }}>
                        <Chart
                            options={{
                                labels: Object.keys(getPolarData()),
                                chart: {
                                    type: 'polarArea',
                                    events: {
                                        click(e, chartContext, config) {
                                            // Aqui vai pegar e selecionar as tabuadas na Rodada.
                                            console.log(chartContext.w.globals.labels[config.globals.selectedDataPoints[0][0]]);
                                        }
                                    }
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
                            series={Object.values(getPolarData())}
                            type="polarArea"
                            height="100%"
                        />
                    </Card>
                </Grid>
            </Grid>

        </Grid >
    );
}