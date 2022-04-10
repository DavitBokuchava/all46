/* eslint-disable */

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOltList } from '../reducers/olt/actions';
const useData = () => {
  const [isLoading, setIsloading] = useState(true);
  const [olts, setData] = useState(null);
  const [oltName, setArrayKeys] = useState([])

  const loading = useSelector(state => state.olt.getOltList.isLoding)
  const oltlist = useSelector(state => state.olt.getOltList.items)
  const dispatch = useDispatch();
  dispatch(getOltList());
  useEffect(() => {
    setIsloading(loading);
    setData(oltlist);
    olts && setArrayKeys([...Object.keys(olts)])
    console.log(olts, "olts")
  }, [loading]);
  return {
    olts,
    isLoading,
    oltName,
  };
};

export default useData;

// const isloadiGetPokemons = useSelector(getPokemonsIsLoading);
  // const getDataOfPokemons = useSelector(getPokemonsData);
//   getOltList:{
//     isLoading:false,
//     items:null,
//     length:0,
//     error:null,
//     success:false
// },