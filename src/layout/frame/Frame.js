import {Route} from 'react-router-dom';
import Nav from 'nav/Nav';
import Home from 'view/home/Home.js';
import SignUp from 'view/user/SignUp';
import SignIn from 'view/user/SignIn';
import cfg from 'config/config.json';
import S from './style.scss';

export default class Layout extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            myInfo: null,
            signInMsg: null
        };
        this.signInAjax = this.signInAjax.bind(this);
    }

    signInAjax(reqData){
        $.post(`${cfg.url}/login`,reqData).done(ret=>{
            let {code,data} = ret;
            if(code === 0){

            }else{
                this.setState({signInMsg:ret});
            }
        });
    }

    render(){
        let {signInAjax} = this;
        let {signInMsg} = this.state;
        return (
            <div className={S.layout}>
                <Nav/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/sign_in" render={
                    (props)=>(
                        <SignIn
                            {...{
                                signInAjax,
                                signInMsg
                            }}
                        />
                    )
                }/>
                <Route exact path="/sign_up" component={SignUp}/>
            </div>
        );
    }
}
