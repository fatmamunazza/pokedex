import React,{useCallback,useEffect,useState} from "react";
import '../style/dashboard.css';
import { Row,Col ,Input,Button} from "reactstrap";
import axiosClient from "../services/AxiosClientService";
import PokemonDesc from "./PokemonDesc";
import { strToCamelCase,getPokemonColor,extarctingOffSet,extractPokemonIndex,getShortName} from "../services/UtilitiesService";
import { getResponse } from "../services/DataFetcherService";
import Filter from "./Filter";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faBars } from "@fortawesome/free-solid-svg-icons";


export default function Dashboard(){

    const [data,setData]=useState({});
    const [page,setPage]=useState(20);
    const [offset,setOffset]=useState(0);
    const [limit,setLimit]=useState(30);
    const [prev,setPrev]=useState(null);
    const [next,setNext]=useState(null);
    const [pokemonData,setPokemonData]=useState(null);
    const [toggle, setToggle] = useState(false);
    const [pokemonSelected,setPokemonSelected]=useState(0);
    const [male,setMale]=useState(null);
    const [femal,setFemale]=useState(null);
    const [genderless,setGenderless]=useState(null);
    const [filterComp, showFilterComp] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const loadingPoekmon = async (data)=>{
        console.log("loading data")
        let _pokemonData=await Promise.all(data.map(async pokemon =>{
            let pokemonRecord=await getResponse(pokemon.url);
            return pokemonRecord;
        }));
        return _pokemonData;
    }

    const fetchData=async ()=>{
        try{
            let uri=`pokemon?offset=${offset}&limit=${limit}`;
            const res=await axiosClient.get(uri);
            setData({count:res.count,next:res.next,results:res.results});
            setPrev(res.previous);
            setNext(res.next);
            let pokemonRecords=await loadingPoekmon(res.results);
            setPokemonData(pokemonRecords);
        }catch(err){
            console.log(err);
        }
    }

    // async function getPokemonGeneders(container,gender){
    //     let url="https://pokeapi.co/api/v2/gender/"+gender;
    //     let response=await getResponse(url);

    //     response.map(())

    // }

    useEffect(()=>{
      fetchData();
    },[offset]);

    useEffect(()=>{

    });

    useEffect(() => {
            const mediaQuery = window.matchMedia("(max-width: 768px)");
            const handleMediaChange = (e) => {
            setIsMobile(e.matches);
        };

        handleMediaChange(mediaQuery);
        mediaQuery.addListener(handleMediaChange);
            return () => {
                mediaQuery.removeListener(handleMediaChange);
            };
    
    }, []);

    function handlePrevPage(){
        if(prev===null)
            return null;

        const val=extarctingOffSet(prev);
        setOffset(val);
    }

    function handleNextPage(){
        if(next===null)
            return null;

        const val=extarctingOffSet(next);
        setOffset(val);
    }

   async function getSearchValue(e){
        try{
            if(e.target.value===undefined){
               await fetchData();
                return;
            }
            var val=e.target.value;
            // console.log(e);
            const uri=`pokemon/${val}`;
            let response = await axiosClient.get(uri);
            // console.log("search ",response)
            setPokemonData([response]);
            return response;
       }catch(err){
           console.error(err);
       }
    }  

    function pokemonDesc(id){
        console.log(id);
        setPokemonSelected(id);
        setToggle(true);
    }

    return(
        <div className="container-fluid page">
            {
                
                toggle && 
                <PokemonDesc toggle={toggle} setToggle={(e)=>setToggle(e)} data={pokemonData} id={pokemonSelected} setId={(e)=>setPokemonSelected(e)}/>
                
            }

            { filterComp && (
                    <Filter filterComp={filterComp} showFilterComp={showFilterComp} />
                )
            }
        
            <div className="header">
                <div className="title">Pokédex </div>
                <div className='vr'></div>
                <div className='desc'>Search for any Pokémon that exists on the planet</div>
            </div>
            <Row className="filter-container">
                {/* <Col className="col-6">
                    <label htmlFor="search">Search By</label> */}
                {/* <Col className={isMobile ? "col-10" : "col-6"}> {isMobile ? <></> : <label htmlFor="search">Search By</label>}
                    <Input type="text" name="search" id="search" placeholder="Name or Number" onChange={(e)=>getSearchValue(e)}></Input> */}
                {/* </Col> */}
                <Col className={isMobile ? "col-10" : "col-6"}> 
                    {isMobile ? <></> : <label htmlFor="search">Search By</label>} 
                    <div className="search-container"> 
                    <Input type="text" name="search" id="search" placeholder="Name or Number" onChange={(e) => getSearchValue(e)} >
                    </Input> 
                        <div className="search-icon"> <FontAwesomeIcon icon={faMagnifyingGlass} /> </div>
                     </div> 
                </Col>
                {/* <Col className="col-6"> */}
                <Col className={isMobile ? "col-2" : "col-6"}> {isMobile ? ( <div className="bar-icon"> <FontAwesomeIcon icon={faBars} size={"2x"} onClick={() => showFilterComp(true)} /> </div> ) : (
                    <Row>
                        <Col className="col-4">
                            <label htmlFor="type">Type</label>
                            <Input type="text" name="type" id="type" placeholder="Normal + 5 More" />
                        </Col>
                        <Col className="col-4">
                            <label htmlFor="gender">Gender</label>
                            <Input type="text" name="gender" id="gender" placeholder="Male + 2 More" />
                        </Col>
                        <Col className="col-4">
                            <label htmlFor="stats">Stats</label>
                            <Input type="text" name="stats" id="stats" placeholder="HP + 5 More" />
                        </Col>
                </Row>)}
                </Col>
            </Row>
            <Row className="item-container">
                {
                    pokemonData?.map((pokemon,id)=>{
                        const name=pokemon.name;
                        const imageUrl=pokemon.sprites.front_default;
                        let index=("000" + pokemon.id).slice(-4);
                        let pokemonType=pokemon.types[0].type.name;

                        return(
                        <Col key={index} className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 pb-4">
                            <div className="card p-2" style={{background:getPokemonColor(pokemonType)}} onClick={()=>pokemonDesc(id)}>
                                <img className="image" src={imageUrl}/>
                                <div className="card-text">{strToCamelCase(name)}</div>
                                <div className="card-number">{index}</div>
                            </div>
                        </Col>
                        );
                })}
            </Row>
            <div className="text-center">
                    <Button className="prev" onClick={()=>handlePrevPage()}
                       tag="input"
                       type="submit"
                       value="prev"
                    />
                    {' '}
                    <Button onClick={()=>handleNextPage()}
                        tag="input"
                        type="submit"
                        value="next"
                    />
                    {' '}
            </div>
        </div>
    );
}