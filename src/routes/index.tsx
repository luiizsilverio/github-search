import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import Repository from '../pages/Repository';

const Routes: React.FC = () => {
    return (
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/repository/:repository+" component={Repository} />
        </Switch>  
        
        // se usar o + após /:repository+, indica que tudo o que vem
        // depois da barra é :repository, inclusive barras
    )
}

// o <Switch> garante que apenas uma rota será exibida por vez
// o exact diz que somente a rota / é Dashboard, e não / alguma coisa

export default Routes;
