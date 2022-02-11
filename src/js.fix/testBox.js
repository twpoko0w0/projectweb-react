import Item from "./testitem";
import './testBox.css'

const Transaction = (props)=>{
    const {items} = props
    return (
      <ul className="item-list">
          {items.map((element,idex)=>{
              return <Item key={idex} {...element} 
              />
              
          })}
          
      </ul>
    );
}

export default Transaction