// Arquivo: apiService.ts

export interface PostGame {
    user_id: number;
    multiplication_table: number;
    round: number;
    sum_of_multiplication_table_errors: number;
}

export const postGameAPI = async (data: PostGame): Promise<Response> => {
    const url = 'http://localhost:3000/api'; // Substitua pelo seu endpoint real

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Erro na requisição');
        }

        return response;
    } catch (error) {
        console.error('Erro ao realizar a requisição:', error);
        throw error;
    }
};
