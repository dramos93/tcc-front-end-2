import { getClassFromTeacher } from "../../services/api";

export interface ResultsRounds {
    table: number;
    errors: number;
}

export interface Rounds {
    round: number;
    sum_of_round_errors: number;
    resultsRounds: ResultsRounds[];
}

export interface Student {
    name: string;
    rounds: Rounds[];
    // Outras propriedades, se houver
}

export interface GroupOfStudents {
    className: string;
    students: Student[];
}

export const virDoBanco: GroupOfStudents[] = [
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
                            { table: 1, errors: 1 },
                            { table: 2, errors: 7 },
                            { table: 3, errors: 5 }]
                    }]
            }, {
                name: 'Daniel Filho',
                rounds: [
                    {
                        round: 1,
                        sum_of_round_errors: 20,
                        resultsRounds: [
                            { table: 1, errors: 8 },
                            { table: 2, errors: 7 },
                            { table: 3, errors: 5 }]
                    }]
            }, {
                name: 'Artur',
                rounds: [
                    {
                        round: 1,
                        sum_of_round_errors: 23,
                        resultsRounds: [
                            { table: 1, errors: 1 },
                            { table: 2, errors: 7 },
                            { table: 3, errors: 15 }]
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
                                errors: 1
                            },
                            {
                                table: 2,
                                errors: 4
                            },
                            {
                                table: 3,
                                errors: 3
                            }]
                    },
                    {
                        round: 2,
                        sum_of_round_errors: 5,
                        resultsRounds: [
                            {
                                table: 1,
                                errors: 0
                            },
                            {
                                table: 2,
                                errors: 2
                            },
                            {
                                table: 3,
                                errors: 3
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
                                errors: 1
                            },
                            {
                                table: 2,
                                errors: 5
                            },
                            {
                                table: 3,
                                errors: 8
                            }]
                    },
                    {
                        round: 2,
                        sum_of_round_errors: 10,
                        resultsRounds: [
                            {
                                table: 1,
                                errors: 0
                            },
                            {
                                table: 2,
                                errors: 4
                            },
                            {
                                table: 3,
                                errors: 6
                            }]
                    },
                    {
                        round: 3,
                        sum_of_round_errors: 11,
                        resultsRounds: [
                            {
                                table: 1,
                                errors: 1
                            },
                            {
                                table: 2,
                                errors: 4
                            },
                            {
                                table: 3,
                                errors: 6
                            }]
                    }
                ]
            }]
    }
];


export async function getFromDB(token: string | null, userId: number | null): Promise<GroupOfStudents[]> {
    const result = await getClassFromTeacher(token, userId)

    return result
    
}