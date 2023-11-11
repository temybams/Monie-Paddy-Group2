import { Link } from "react-router-dom";


export default function payment() {
    
  return (
    <div>
        <h1>This is the payment page</h1>
        <Link to="/airtime">
        <button>buy airtime</button>
        </Link>
        <Link to="/send-money">
        <button>send money</button>
        </Link>
        
        
    </div>
  )
}
