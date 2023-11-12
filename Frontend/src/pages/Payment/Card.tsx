function Card(props: any) {
    return (
      <div>
        <img src={props.image} />
        <h3 className="fs-4 fw-normal pt-3 text-dark">{props.header}</h3>
        <p className="text-black-50 fw-normal">{props.message}</p>
      </div>
    )
  }
  
  export default Card