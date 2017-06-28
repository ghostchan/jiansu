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
            signInMsg: null,
            signUpMsg: null
        };
        this.signInAjax = this.signInAjax.bind(this);
        this.signUpAjax = this.signUpAjax.bind(this);
        this.clearLoginMsg = this.clearLoginMsg.bind(this);
    }

    clearLoginMsg(){
        this.setState({
            signInMsg: null,
            signUpMsg: null
        });
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

    signUpAjax(reqData){
        $.post(`${cfg.url}/register`,reqData)
            .done((ret)=>{
                let {code,data} = ret;
                this.setState({signUpMsg:ret});
            });
    }

    render(){
        let {signInAjax,signUpAjax,clearLoginMsg} = this;
        let {signInMsg,signUpMsg} = this.state;
        return (
            <div className={S.layout}>
                <Nav/>
                <Route exact path="/" component={Home}/>
                <Route exact path="/sign_in" render={
                    (props)=>(
                        <SignIn
                            {...{
                                signInAjax,
                                signInMsg,
                                clearLoginMsg
                            }}
                        />
                    )
                }/>
                <Route exact path="/sign_up" render={
                    (props)=>(
                        <SignUp
                            {...{
                                signUpAjax,
                                signUpMsg,
                                clearLoginMsg
                            }}
                        />
                    )
                }/>
            </div>
        );
    }
}
