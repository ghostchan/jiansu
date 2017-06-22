import {Link} from 'react-router-dom';

export default function Author({user}){
    let {user_name, avatar} = user;
    return (
        <div className="item">
            <Link
                to="/"
                className="ui mini avatar image"
            >
                <img src={avatar} alt=""/>
            </Link>
            <div className="content">
                <div className="header">
                    {user_name}
                </div>
            </div>
        </div>

    );
}
