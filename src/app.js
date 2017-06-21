
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom';
import Layout from 'layout/Layout';

require('semantic/dist/semantic.min.css');
require('semantic/dist/semantic.min.js');
ReactDOM.render(
    <Router>
        <Route path="/" component={Layout}/>
    </Router>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
