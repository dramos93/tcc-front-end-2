import { Checkbox, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';

// const nomes = ["Daniel", 'Abigail'];
// import * as React from 'react';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;


const classes: string[] = ["2º Ano - Matutino", "2º Ano - Vespertino"];
const students: string[] = ["Daniel", "Abigail", "Catarina"];
const rounds: number[] = [1, 2, 3, 4, 5];

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

    return <>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={classesSelected}
            label="Age"
            onChange={handleChangeClasses}
        >
            {classes.map(c => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
        </Select>
        <Select
            labelId="demo-multiple-checkbox-label"
            id="demo-multiple-checkbox"
            value={studentSelected}
            onChange={handleChangeStudents}
            renderValue={(selected) => selected.join(', ')}
            multiple
            input={<OutlinedInput label="Tag" />}
        // MenuProps={MenuProps} //Aqui vai os props de largura, etc.
        >
            {students.map((student) => (
                <MenuItem key={student} value={student}>
                    <Checkbox checked={studentSelected.indexOf(student) > -1} />
                    <ListItemText primary={student} />
                </MenuItem>
            ))}
        </Select>
        <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={roundSelected}
            label="Age"
            onChange={handleChangeRound}
            multiple
            input={<OutlinedInput label="Tag" />}
        >
            {rounds.map(c => (
                <MenuItem key={c} value={c}>{c}</MenuItem>
            ))}
        </Select>
        <OutlinedInput />
        <OutlinedInput />
        {/* Possível biblioteca para usar nos gráficos: https://formidable.com/open-source/victory/guides/events#external-event-mutations */}
    </>;
}