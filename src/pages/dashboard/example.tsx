export interface GroupOfStudents {
    className: string;
    students: Student[];
}

export interface Student {
    name: string;
    rounds: Rounds[];
    // Outras propriedades, se houver
}

export interface Rounds {
    round: number;
    sum_of_round_errors: number;
    resultsRounds: ResultsRounds[];
}

export interface ResultsRounds {
    table: number;
    sum_of_multiplication_table_errors: number;
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