import React, { useState, FormEvent, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom';

import logoImg from '../../assets/logo_app.svg';
import { Titulo , Form, Error, Repositories } from './styles';
import api from '../../services/api';

interface Repository {
    full_name: string;
    description: string;
    owner: {
        login: string;
        avatar_url: string;
    }
}

const Dashboard: React.FC = () => {
    const [newRepo, setNewRepo] = useState('');
    const [inputError, setInputError] = useState('');
    //const [repositories, setRepositories] = useState<Repository[]>([]);
    
    const [repositories, setRepositories] = useState<Repository[]>(() => {
        const storagedRepo = localStorage.getItem('repositories');        
        if (storagedRepo) {
            return JSON.parse(storagedRepo);
        } else {
            return [];
        }
    });  //podemos inicializar uma variável com o valor de uma função

    // toda vez que alterar o valor de repositories, vai chamar o useEffect
    useEffect(() => {
        localStorage.setItem('repositories', JSON.stringify(repositories));
    }, [repositories]);

    async function handleAddRepository(event: FormEvent) {
        //(event: FormEvent<HTMLFormElement>): Promise<void> {
        event.preventDefault();
        
        if (!newRepo) {
            setInputError('Digite o autor/nome do repositório');
            return;
        }
                
        try {
            const response = await api.get(`/repos/${newRepo}`);
            const repository = response.data;
            console.log(repository)
                    
            setRepositories([...repositories, repository]);
            setNewRepo('');
            setInputError('');
        
        } catch (err) {
            setInputError('Erro na busca do repositório');
        }
    }

    return (
        <>
        <img src={logoImg} alt="Github Explorer" />
        <Titulo>Explore repositórios no Github</Titulo>

        <Form temErro={!!inputError} onSubmit={handleAddRepository}>
            <input 
                value={newRepo}
                onChange={(e) => setNewRepo(e.target.value)}
                placeholder="Nome do repositório (ex: luiizsilverio/dashgo)" 
            />
            <button type="submit">Pesquisar</button>
        </Form>

        { inputError && <Error>{inputError}</Error> }
        
        {repositories.map(repository => (
            <Repositories>
                <Link key={repository.full_name} 
                    to={`/repository/${repository.full_name}`}>
                    <img    
                        src={repository.owner.avatar_url}
                        alt={repository.owner.login}
                    />
                    <div>
                        <strong>{repository.full_name}</strong>
                        <p>{repository.description}</p>
                    </div>
                    <FiChevronRight size={24}/>
                </Link>
            </Repositories>
        ))}
                    
        </>
    );
};

export default Dashboard;

