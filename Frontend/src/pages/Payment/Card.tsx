function Card(props: any) {
    return (
      <div>
        <img src={props.image} />
        <h3>{props.header}</h3>
        <p>{props.message}</p>
      </div>
    )
  }
  
  export default Card