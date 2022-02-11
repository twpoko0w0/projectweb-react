import PropTypes from 'prop-types';


const Item = (props) =>{
    const {name,amount} =props
    return(
        <>
        <li><span>{name}</span><span>{amount}</span>
        <span className='bn'>
        <button style={{color:"darkblue"}}>/</button>
        {"  "}
        <button style={{color:"darkblue"}}
        
        >x</button>
        </span>
        </li>
        
        </>
        
    );
}
Item.propTypes={
    name:PropTypes.string.isRequired,
    amount:PropTypes.number.isRequired
}

export default Item