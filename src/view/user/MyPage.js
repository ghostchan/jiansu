import AuthorInfo from 'components/myPage/AuthorInfo';
import Aside from 'components/myPage/Aside';
import PreviewList from 'preview/PreviewList';

let propTypes = {
    previewsName: PT.string,
    notebooks:PT.array,
    myPagePreviews:PT.array,
    changePreviews:PT.func
}

export default class MyPage extends React.Component{
    constructor(props){
        super(props);
        this.collectionClick = this.collectionClick.bind(this);
    }

    collectionClick(collection_id,collection_name,userInfo){
        this.props.changePreviews({collection_id},collection_name);
    }
    render(){
        let {previewsName,notebooks,myPagePreviews,location} = this.props;
        let {userInfo} = location.state;
        let {collectionClick} = this;
        return (
            <div className="ui container grid">
                <div className="twelve wide column">
                    <AuthorInfo
                        {...{
                            userInfo
                        }}
                    />
                    <div className="ui secondary pointing menu">
                        <span className="active item">
                            {previewsName}
                        </span>
                    </div>
                    <PreviewList
                        {...{
                            previews: myPagePreviews,
                            collectionClick
                        }}
                    />
                </div>
                <div className="four wide column">
                    <Aside
                        {...{
                            notebooks,
                            userInfo
                        }}
                    />
                </div>
            </div>
        );
    }
}
