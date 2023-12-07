import Nav from "./Navigation/Nav";
import Recommended from "./Recommended/Recommended";
import Products from "./Products/Products";
import Sidebar from "./Sidebar/Sidebar";
import { useState } from "react";
import Card from "./components/Card";
import "./index.css"

//Database
import products from './db/data';

function App() {
  const[selectedCategory, setSelectedCategory] = useState(null);
  const[query, setQuery] = useState('');

  // Input filter


  const handleInputChange = event => {
    setQuery(event.target.value)
  };

  const filteredItems = products.filter((product) => product.title.toLowerCase().indexOf(query.toLowerCase())!==-1
  );

  

  // Radio Filter
  const handleChange = event=>{
    setSelectedCategory(event.target.value);
  };

  // buttons filter
  const handleClick = (event) => {
    setSelectedCategory(event.target.value);
  };

  function filteredData(products, selected, query){
    let filteredProducts = products;
  

  // Filtering Input items
  if(query) {
    filteredProducts=filteredItems;
  }

  // Selected Filter

  if(selected) {
    filteredProducts = filteredProducts.filter(
      ({category, color, company, newPrice, title}) => 
      category === selected || 
      color === selected || 
      company === selected || 
      newPrice == selected || 
      title === selected
      );
  }

  // Another way of writing this code is, in the above block of code we used the destructuring method

  // if(selected) {
  //   filteredProducts = filteredProducts.filter(
  //     (product)=>
  //       product.category === selected||
  //       product.color === selected||
  //       product.company === selected||
  //       product.newPrice === selected||
  //       product.title === selected
  //     )
  // }

    return filteredProducts.map(
      ({ img, title, star, reviews, prevPrice, newPrice }) => (
        <Card
          key={Math.random()}
          img={img}
          title={title}
          star={star}
          reviews={reviews}
          prevPrice={prevPrice}
          newPrice={newPrice}
        />
      )
    );
  }

  const result = filteredData(products, selectedCategory, query);

  return (
    <>
    <Sidebar handleChange={handleChange}/>
    <Nav query={query} handleInputChange={handleInputChange}/>
    <Recommended handleClick={handleClick}/>
    <Products result={result}/>
    </>
   
  );
}

export default App;
