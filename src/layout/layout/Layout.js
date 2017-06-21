import Nav from 'nav/Nav';
export default class Layout extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div>
                <Nav/>
            </div>
        );
    }
}