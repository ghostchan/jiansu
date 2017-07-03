import {Route,Redirect} from 'react-router-dom';
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
            signUpMsg: null,
            hasLoginReq: false,
            myPagePreviews: [],
            notebooks:[],
            previewsName: '所有文章'
        };
        this.signInAjax = this.signInAjax.bind(this);
        this.signUpAjax = this.signUpAjax.bind(this);
        this.clearLoginMsg = this.clearLoginMsg.bind(this);
        this.initMyInfo = this.initMyInfo.bind(this);
        this.logOut = this.logOut.bind(this);
        this.getPreview = this.getPreview.bind(this);
        this.initMyPage = this.initMyPage.bind(this);
        this.changePreviewsName = this.changePreviewsName.bind(this);
    }
    initMyInfo(myInfo){
        if(myInfo){
            myInfo.avatar = cfg.url + myInfo.avatar;
        }
        this.setState({myInfo});
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
                this.initMyInfo(ret.data);
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

                if(code === 0){
                    setTimeout(()=>{
                        this.initMyInfo(ret.data);
                    });
                }
            });
    }
    logOut(){
        $.post(`${cfg.url}/logout`)
            .done(({code})=>{
                if(code===0){
                    this.initMyInfo(null);
                }
            });
    }

    getPreview(data){
        $.post(`${cfg.url}/getPreview`,data)
            .done(({code,data})=>{
                this.setState({
                    myPagePreviews: data
                });
            });
    }

    initMyPage(user_id,previewsData,previewName){
        this.getPreview(previewsData);

        $.post(`${cfg.url}/getCollection`,{
            user_id
        })
         .done(({code,data})=>{
            if(code===0){
                this.setState({
                    notebooks: data,
                    previewName
                });
            }
         });
    }

    changePreviewsName(previewsName){
        this.setState({previewsName});
    }
    componentDidMount(){
        $.post(`${cfg.url}/autologin`)
            .done(({code,data})=>{
              if(code===0){
                  this.initMyInfo(data);
              }
              this.setState({hasLoginReq:true});
        });
    }

    render(){
        let {signInAjax,signUpAjax,clearLoginMsg,logOut} = this;
        let {signInMsg,signUpMsg,myInfo,hasLoginReq} = this.state;
        if(!hasLoginReq){
            return (<div></div>);
        }
        return (
            <div className={S.layout}>
                <Nav
                    {...{
                        myInfo,
                        logOut
                    }}
                />
                <Route exact path="/" component={Home}/>
                <Route exact path="/sign_in" render={
                    (props)=>(
                        myInfo ? (
                            <Redirect to="/"/>
                        ) : (
                            <SignIn
                                {...{
                                    signInAjax,
                                    signInMsg,
                                    clearLoginMsg
                                }}
                            />
                            )

                    )
                }/>
                <Route exact path="/sign_up" render={
                    (props)=>(
                        myInfo ? (
                            <Redirect to="/"/>
                        ) : (
                                <SignUp
                                    {...{
                                        signUpAjax,
                                        signUpMsg,
                                        clearLoginMsg
                                    }}
                                />
                            )
                    )
                }/>
            </div>
        );
    }
}
