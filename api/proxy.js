import 'dotenv/config';
import { env } from 'process';
import { URL } from 'url';

export default async function handler(req, res) {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const path = url.searchParams.get('path');
    const endpoint = path ? `/${path}` : req.url.replace('/api/proxy', '');

    try {
        const resposta = await fetch(`https://ratsjs.onrender.com/api${endpoint}`, {
            method: req.method,
            headers: {
                'x-api-key': env.API_KEY,
                'Content-Type': 'application/json',
            },
            ...(req.method !== 'GET' && { body: JSON.stringify(req.body) }),
        });

        const dados = await resposta.json();
        res.status(resposta.status).json(dados);
    } catch (e) {
        res.status(500).json({ erro: e.message });
    }
}
