
import PreviewList from 'preview/PreviewList';
import Recommend from 'components/home/Recommend';

export default class Home extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="ui container grid">
                <div className="column twelve wide">
                    <PreviewList />
                </div>
                <div className="column four wide">
                    <Recommend/>
                </div>
            </div>
        );
    }
}
