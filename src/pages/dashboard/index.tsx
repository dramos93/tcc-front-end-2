import React, { useContext, useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Checkbox,
    FormControl,
    Grid,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Chart from "react-apexcharts";
import { AuthContext } from '../../hooks/useAuth';
import { Rounds, Student, GroupOfStudents, getFromDB } from './example';

// Types
interface StudentTableRow {
    id: string;
    name: string;
    sum_errors: number;
}

interface ChartData {
    [key: string]: number;
}

// Constants
const GRID_COLUMNS: GridColDef[] = [
    {
        field: 'name',
        flex: 0.5,
        align: 'center',
        headerAlign: 'center',
        renderHeader: () => <strong>Nome do Aluno</strong>,
    },
    {
        field: 'sum_errors',
        flex: 0.5,
        align: 'center',
        headerAlign: 'center',
        renderHeader: () => <strong>Soma de Erros</strong>,
    },
];

const CHART_STYLE = {
    height: 400,
    backgroundColor: '#ffffff',
    padding: 8
};

// Helper Functions
const calculateStudentTable = (students: Student[], roundSelected: number[]): StudentTableRow[] => {
    return students
        ?.map(student => ({
            id: student.name,
            name: student.name,
            sum_errors: student.rounds
                .filter(r => roundSelected.includes(r.round))
                .reduce((sum, round) => sum + round.sum_of_round_errors, 0)
        }))
        .sort((a, b) => b.sum_errors - a.sum_errors);
};

const calculateBarData = (students: Student[], studentsSelected: string[], roundSelected: number[]): ChartData => {
    const filteredStudents = students.filter(student => studentsSelected.includes(student.name));
    const rounds = filteredStudents.flatMap(student => student.rounds);

    return rounds.reduce((acc: ChartData, round: Rounds) => {
        const roundKey = `${round.round}ª Rodada`;
        acc[roundKey] = (acc[roundKey] || 0) + round.sum_of_round_errors;
        return acc;
    }, {});
};

const calculatePolarData = (students: Student[], studentsSelected: string[], roundSelected: number[]): ChartData => {
    const filteredStudents = students.filter(student => studentsSelected.includes(student.name));
    const filteredRounds = filteredStudents
        .flatMap(x => x.rounds)
        .filter(r => roundSelected.includes(r.round));
    const tablesResults = filteredRounds.flatMap(r => r.resultsRounds);
    console.table(tablesResults)

    const finalResult = tablesResults.reduce((acc: ChartData, result) => {
        const tableKey = `Tabuada ${result.table}`;
        console.group()
        console.log(acc);
        console.log(result)
        console.log(tableKey);
        console.log(acc[tableKey]);
        console.log((acc[tableKey] || 0) + result.errors);
        console.groupEnd()
        acc[tableKey] = (acc[tableKey] || 0) + result.errors;
        return acc;
    }, {} as ChartData);
    console.group();
    console.group()
    console.log("finalResult")
    console.log(finalResult)
    console.groupEnd();
    console.groupEnd()
    return finalResult
};

const calculateAverageErrors = (students: Student[], studentsSelected: string[], roundDistinct: number[]): number => {
    const filteredStudents = students.filter(s => studentsSelected.includes(s.name));
    const allRoundsSelected = filteredStudents.flatMap(sa => sa.rounds);

    const roundAverages = roundDistinct.map(round => {
        const roundErrors = allRoundsSelected.filter(item => item.round === round);
        const totalErrors = roundErrors.reduce((sum, item) => sum + item.sum_of_round_errors, 0);
        return totalErrors / roundErrors.length;
    });

    return roundAverages.length ?
        roundAverages.reduce((sum, avg) => sum + avg, 0) / roundAverages.length :
        0;
};

const Dashboard: React.FC = () => {
    // State
    const [classSelected, setClassSelected] = useState<string>("");
    const [studentsSelected, setStudentsSelected] = useState<string[]>([]);
    const [roundSelected, setRoundSelected] = useState<number[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [roundDistinct, setRoundDistinct] = useState<number[]>([]);
    const [averageErrors, setAverageErrors] = useState<number>(0);
    const [classes, setClasses] = useState<GroupOfStudents[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const { token, userId } = useContext(AuthContext);
    const polarData: ChartData = calculatePolarData(students, studentsSelected, roundSelected);

    // Effects
    useEffect(() => {
        const initializeDashboard = async () => {
            try {
                const fetchedClasses = await getFromDB(token, userId);
                if (fetchedClasses.length === 0) return;

                const firstClass = fetchedClasses[0];
                const firstClassStudents = fetchedClasses[0].students;
                const firstClassRounds = Array.from(
                    new Set(firstClassStudents.flatMap(s => s.rounds.map(r => r.round)))
                );

                setClasses(fetchedClasses);
                setClassSelected(firstClass.className);
                setStudents(firstClassStudents);
                setStudentsSelected(firstClassStudents.map(s => s.name));
                setRoundSelected(firstClassRounds);
                setRoundDistinct(firstClassRounds);
                setAverageErrors(calculateAverageErrors(
                    firstClassStudents,
                    firstClassStudents.map(s => s.name),
                    firstClassRounds
                ));
                console.log("Aqui")
                console.log(polarData)

            } catch (error) {
                console.error('Failed to initialize dashboard:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeDashboard();
    }, [token, userId]);

    // Handlers
    const handleClassChange = (event: SelectChangeEvent<string>) => {
        const newClass = event.target.value;
        const classStudents = classes.find(c => c.className === newClass)?.students || [];
        const classRounds = Array.from(
            new Set(classStudents.flatMap(s => s.rounds.map(r => r.round)))
        );

        setClassSelected(newClass);
        setStudents(classStudents);
        setStudentsSelected(classStudents.map(s => s.name));
        setRoundSelected(classRounds);
        setRoundDistinct(classRounds);
        setAverageErrors(calculateAverageErrors(classStudents,
            classStudents.map(s => s.name),
            classRounds
        ));
    };

    const handleStudentChange = (event: SelectChangeEvent<string[]>) => {
        const newSelectedStudents = event.target.value as string[];
        if (newSelectedStudents.length === 0) return;

        const studentRounds = Array.from(
            new Set(
                students
                    .filter(s => newSelectedStudents.includes(s.name))
                    .flatMap(s => s.rounds.map(r => r.round))
            )
        );

        setStudentsSelected(newSelectedStudents);
        setRoundDistinct(studentRounds);
        setRoundSelected(studentRounds);
        setAverageErrors(calculateAverageErrors(students, newSelectedStudents, studentRounds));
    };

    const handleRoundChange = (event: SelectChangeEvent<number[]>) => {
        const newRounds = event.target.value as number[];
        if (newRounds.length === 0) return;

        setRoundSelected(newRounds);
        setAverageErrors(calculateAverageErrors(students, studentsSelected, newRounds));
    };

    if (isLoading) return <div>Carregando...</div>;

    return (
        <Grid container spacing={2}>
            <Grid item xs={4}>
                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Turma</InputLabel>
                    <Select
                        value={classSelected}
                        label="Turma"
                        onChange={handleClassChange}
                    >
                        {classes.map(c => (
                            <MenuItem key={c.className} value={c.className}>
                                {c.className}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Alunos</InputLabel>
                    <Select
                        multiple
                        value={studentsSelected}
                        label="Alunos"
                        onChange={handleStudentChange}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {students.map((student) => (
                            <MenuItem key={student.name} value={student.name}>
                                <Checkbox checked={studentsSelected.includes(student.name)} />
                                <ListItemText primary={student.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Rodadas</InputLabel>
                    <Select
                        multiple
                        value={roundSelected}
                        label="Rodadas"
                        onChange={handleRoundChange}
                    >
                        {roundDistinct.map(round => (
                            <MenuItem key={round} value={round}>
                                {round}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Card sx={{ mb: 2 }}>
                    <CardContent>
                        <Typography variant="subtitle2" align="center">
                            MÉDIA DE ERROS POR RODADA
                        </Typography>
                        <Typography variant="h3" align="center">
                            {averageErrors.toFixed(2)}
                        </Typography>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <Typography variant="subtitle2" align="center">
                            RODADAS COMPLETAS
                        </Typography>
                        <Typography variant="h3" align="center">
                            {roundDistinct.length}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>

            <Grid item xs={8}>
                <Card sx={{ height: '100%' }}>
                    <Chart
                        type="bar"
                        height="100%"
                        series={[{
                            data: Object.values(calculateBarData(students, studentsSelected, roundSelected))
                        }]}
                        options={{
                            chart: {
                                id: "errors-by-round",
                                type: 'bar'
                            },
                            xaxis: {
                                title: { text: 'Rodada' },
                                categories: Object.keys(calculateBarData(students, studentsSelected, roundSelected))
                            },
                            yaxis: {
                                title: { text: 'Quantidade de Erros' }
                            },
                        }}
                    />
                </Card>
            </Grid>

            <Grid item xs={4}>
                <div style={{ height: 400 }}>
                    <DataGrid
                        rows={calculateStudentTable(students, roundSelected)}
                        columns={GRID_COLUMNS}
                        density="compact"
                        hideFooter
                        rowHeight={50}
                        disableRowSelectionOnClick
                    />
                </div>
            </Grid>

            <Grid item xs={8}>
                <Card sx={{ height: 400 }}>
                    <Chart
                        options={{
                            // labels: ['1ª Rodada', '2ª Rodada'],
                            labels: Object.keys(polarData),
                            chart: {
                                type: 'polarArea'
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
                            // responsive: [{
                            //     breakpoint: 480,
                            //     options: {
                            //         chart: {
                            //             width: 200
                            //         },
                            //         legend: {
                            //             position: 'bottom'
                            //         }
                            //     }
                            // }]
                        }}
                        series={Object.values(polarData)}
                        // series={[215, 49]}
                        type="polarArea"
                        height="100%"
                    />
                </Card>
            </Grid>
        </Grid>
    );
};

export default Dashboard;