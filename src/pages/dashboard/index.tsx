import { Button, Card, CardContent, Checkbox, FormControl, Grid, InputLabel, ListItemText, MenuItem, Select, SelectChangeEvent, Typography } from '@mui/material';
import { GridColDef, GridColumnHeaderParams, GridRowsProp } from '@mui/x-data-grid';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import React from 'react';
import Chart from "react-apexcharts";


interface GroupOfStudents {
    className: string;
    students: Student[];
}

interface Student {
    name: string;
    rounds: Rounds[];
    // Outras propriedades, se houver
}

interface Rounds {
    round: number;
    sum_of_round_errors: number;
    resultsRounds: ResultsRounds[];
}

interface ResultsRounds {
    table: number;
    sum_of_multiplication_table_errors: number;
}

interface StudentTableInterface {
    'id': string,
    'name': string,
    'sum_errors': number;
}

const virDoBanco: GroupOfStudents[] = [
    {
        className: "1º Ano Matutino",
        students: [
            {
                name: 'Daniel',
                rounds: [
                    {
                        round: 1,
                        sum_of_round_errors: 13,
                        resultsRounds: [
                            { table: 1, sum_of_multiplication_table_errors: 1 },
                            { table: 2, sum_of_multiplication_table_errors: 7 },
                            { table: 3, sum_of_multiplication_table_errors: 5 }]
                    }]
            }, {
                name: 'Daniel Filho',
                rounds: [
                    {
                        round: 1,
                        sum_of_round_errors: 20,
                        resultsRounds: [
                            { table: 1, sum_of_multiplication_table_errors: 8 },
                            { table: 2, sum_of_multiplication_table_errors: 7 },
                            { table: 3, sum_of_multiplication_table_errors: 5 }]
                    }]
            }, {
                name: 'Artur',
                rounds: [
                    {
                        round: 1,
                        sum_of_round_errors: 23,
                        resultsRounds: [
                            { table: 1, sum_of_multiplication_table_errors: 1 },
                            { table: 2, sum_of_multiplication_table_errors: 7 },
                            { table: 3, sum_of_multiplication_table_errors: 15 }]
                    }]
            },


        ]
    },
    {
        className: "2º Ano Vespertino",
        students: [
            {
                name: 'Abigail',
                rounds: [
                    {
                        round: 1,
                        sum_of_round_errors: 8,
                        resultsRounds: [
                            {
                                table: 1,
                                sum_of_multiplication_table_errors: 1
                            },
                            {
                                table: 2,
                                sum_of_multiplication_table_errors: 4
                            },
                            {
                                table: 3,
                                sum_of_multiplication_table_errors: 3
                            }]
                    },
                    {
                        round: 2,
                        sum_of_round_errors: 5,
                        resultsRounds: [
                            {
                                table: 1,
                                sum_of_multiplication_table_errors: 0
                            },
                            {
                                table: 2,
                                sum_of_multiplication_table_errors: 2
                            },
                            {
                                table: 3,
                                sum_of_multiplication_table_errors: 3
                            }]
                    }]
            },
            {
                name: 'Catarina',
                rounds: [
                    {
                        round: 1,
                        sum_of_round_errors: 14,
                        resultsRounds: [
                            {
                                table: 1,
                                sum_of_multiplication_table_errors: 1
                            },
                            {
                                table: 2,
                                sum_of_multiplication_table_errors: 5
                            },
                            {
                                table: 3,
                                sum_of_multiplication_table_errors: 8
                            }]
                    },
                    {
                        round: 2,
                        sum_of_round_errors: 10,
                        resultsRounds: [
                            {
                                table: 1,
                                sum_of_multiplication_table_errors: 0
                            },
                            {
                                table: 2,
                                sum_of_multiplication_table_errors: 4
                            },
                            {
                                table: 3,
                                sum_of_multiplication_table_errors: 6
                            }]
                    },
                    {
                        round: 3,
                        sum_of_round_errors: 11,
                        resultsRounds: [
                            {
                                table: 1,
                                sum_of_multiplication_table_errors: 1
                            },
                            {
                                table: 2,
                                sum_of_multiplication_table_errors: 4
                            },
                            {
                                table: 3,
                                sum_of_multiplication_table_errors: 6
                            }]
                    }
                ]
            }]
    }
];

const firstClassSelected: string = virDoBanco.map(c => c.className)[0];
const firstStudentsSelecteds: string[] = getStudentsFromDB(firstClassSelected).map(s => s.name);
const classes: string[] = virDoBanco.map(c => c.className);

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

function RoundTable(students: Student[], studentsSelecteds: string[], roundSelected: number[]) {
    const studentArray: Student[] = students.filter(student => studentsSelecteds.some(ss => ss === student.name));
    const rounds: Rounds[] = studentArray.flatMap(student => student.rounds);
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

function getRoundsDistinct(classSelected: string): number[] {

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
    const [roundSelected, setRoundSelected] = React.useState<number[]>(getRoundsDistinct(firstClassSelected));
    const [students, setStudents] = React.useState<Student[]>(getStudentsFromDB(firstClassSelected));
    const [roundDistinct, setRoundDistinct] = React.useState<number[]>(getRoundsDistinct(firstClassSelected));
    const [averageErrors, setAverageErrors] = React.useState<number>(
        changeRound(
            getStudentsFromDB(firstClassSelected),
            firstStudentsSelecteds,
            getRoundsDistinct(firstClassSelected)
        ));

    const handleChangeClasses = (event: SelectChangeEvent<any>) => {
        const classSelected: string = event?.target?.value;

        const studentsFromDB: Student[] = getStudentsFromDB(classSelected);
        setStudents(studentsFromDB);

        const roundDistinct: number[] = getRoundsDistinct(classSelected);
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

    function getRoundTable(): object {
        return RoundTable(students, studentsSelecteds, roundSelected);
    };


    return (
        <Grid container>
            <Button onClick={
                () => {

                    console.table(getRoundTable());
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
                            options={{
                                chart: {
                                    id: "basic-bar",
                                    type: 'bar'
                                },
                                xaxis: {
                                    title: {
                                        text: 'Rodada'
                                    },
                                    categories: Object.keys(getRoundTable())
                                },
                                yaxis: {
                                    title: {
                                        text: 'Quantidade de Erros'
                                    }
                                },
                                // }}
                            }}
                            series={[{
                                data: Object.values(getRoundTable())
                            }]}
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
                        // onRowSelectionModelChange={(rows: GridRowId[] | number[], a) => {
                        //     let parseRows: string[] = [];
                        //     for (let index = 0; index < rows.length; index++) {
                        //         const r = rows[index];
                        //         // console.log(typeof r);
                        //         parseRows = [...parseRows, r.toString()];

                        //     }
                        //     console.log(a);
                        //     // console.log(parseRows);
                        //     setStudentsSelecteds(parseRows);
                        // }}
                        // rowSelection={['Daniel']}
                        // rowSelectionModel={['Daniel']}
                        // initialState={ }
                        // onCellClick={v => console.log(v)}
                        // disableRowSelectionOnClick
                        // disableColumnSelector
                        // disableDensitySelector
                        />
                    </div>
                </Grid>
                <Grid container item xs={8} style={s} >
                    <Card style={{ width: "100%", height: "100%" }}>
                        {/* <Chart
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
                            series={rows.map(r => r.sum_errors)}
                            type="polarArea"
                            // width="100%"
                            height="100%"
                        // style={{ backgroundColor: '#fafafa' }}
                        /> */}
                    </Card>
                </Grid>
            </Grid>

        </Grid >
    );
}