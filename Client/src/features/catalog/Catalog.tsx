import { useState, useEffect } from "react";
import { Product } from "../../app/models/Product";
import ProductList from "./ProductList";
import agent from "../../app/api/agent";


export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
     agent.Catalog.list()
     .then(products => setProducts(products))
  }, []);  
  
  return (
    <>
      <ProductList products={products} />
    </>
  );
}
