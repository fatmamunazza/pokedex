import React, { useState,useEffect } from 'react';
import '../style/dashboard.css';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';
import axiosClient from '../services/AxiosClientService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCircleArrowDown,faCircleArrowLeft,faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import { strToCamelCase ,getPokemonColor,getShortName,formatPokemonIndex} from '../services/UtilitiesService';
import { getResponse } from "../services/DataFetcherService";

import {Row,Col} from 'reactstrap';

const ReadMore = ({ children }) => {
    const text = children;
    const [isReadMore, setIsReadMore] = useState(true);
    const toggleReadMore = () => {
      setIsReadMore(!isReadMore);
    };
    return (
      <p className="text text-justify">
        {isReadMore ? text.slice(0, 500) : text}
        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? <b>...read more</b> : <b>show less</b>}
        </span>
      </p>
    );
  };

function PokemonDesc(props) {

    const [desc,setDesc]=useState("");
    const [eggGroups,setEggGroups]=useState([]);
    
    let url='https://pokeapi.co/api/v2/pokemon-species/';
    let pokemonEggGroupUrl="https://pokeapi.co/api/v2/egg-group/";

    async function combinedPokemonDescription(){

        const response=await getResponse(url+props.data[props.id].id);
        let description="";
        response.flavor_text_entries.map(res=>{
            if(res.language.name==='en'){
                description+="\n"+res.flavor_text;
            }
        });
        let eggGroup=new Array();
        response.egg_groups.map(item=>{
            eggGroup.push(item.name);
        });
        eggGroups.map(item=>{
            console.log("item : "+item);
        })
        console.log("egg_groups : "+eggGroups);
        setEggGroups(eggGroup);
        setDesc(description);
    }

    useEffect(()=>{
        combinedPokemonDescription();
    },[props.id]);

let index=formatPokemonIndex(props.data[props.id].id);

function moveLeft(){ 
    if(props.id!==0){
        var current=props.id-1;
        props.setId(current);
    }
}

function moveRight(){ 
    if(props.id < props.data.length-1){
        console.log(props.id);
        var current=props.id+1;
        props.setId(current);
    }
}

function closeModal(){
    props.setToggle(false);
}

  return (
    <div className='page'>
        {
            console.log(props.data[props.id].types[0].type.name)
        }
      <Modal isOpen={props.toggle} toggle={()=>props.setToggle(!props.toggle)} size='lg' >
        <ModalBody className='modal-body'>
          <div className='p-1' >
            <Row>
                <Col className='col-4'>
                <div className="card p-6" style={{background:getPokemonColor(props.data[props.id].types[0].type.name)}} >
                    <img className="image" src={props.data[props.id].sprites.front_default}/>
                </div>
                </Col>
                <Col className='col-8 text-center'>
                    <Row>
                    <Col>
                        <label className="name" >{strToCamelCase(props.data[props.id].name)}</label>
                    </Col>
                    <div className='vr'></div>
                    <Col>
                        <label className="index">{index}</label>
                    </Col>
                    <div className='vr'></div>
                    <Col className='d-flex movers'>
                        <span>
                        <FontAwesomeIcon icon={faCircleArrowLeft} onClick={()=>moveLeft()}/>
                        </span>
                        <span>
                        <FontAwesomeIcon icon={faCircleXmark} onClick={()=>closeModal()}/>
                        </span>
                        <span>
                            <FontAwesomeIcon icon={faCircleArrowDown} rotation={270} onClick={()=>moveRight()}/>
                        </span>
                    </Col>
                        
                    </Row>
                    <Row>
                        <ReadMore className="text-justify">
                            {desc}
                        </ReadMore>
                    </Row>
                </Col>
            </Row>
            <Row className='pb-2 pt-2'>
                <Col className='col-3'>
                    <label className="props pb-1" >Height</label>
                    <p>{props.data[props.id].height}</p>
                </Col>
                <Col className='col-3'>
                    <label className="props pb-1" >Weight</label>
                    <p>{props.data[props.id].weight} kg</p>
                </Col>
                <Col className='col-3'>
                    <label className="props pb-1" >Gender(s)</label>
                    <p>Male,Female</p>
                </Col>
                <Col className='col-3'>
                    <label className="props pb-1" >Egg Groups</label>
                    <br/>
                    {
                        eggGroups.map((item,i)=>{
                            return(
                                <span>{item },</span>
                            );
                        })
                    }
                    {/* <p>Monster</p> */}
                </Col>
            </Row>

            <Row className='pb-2 pt-2'>
                <Col className='col-3'>
                    <label className="props pb-1" >Abilities</label>
                    <br />
                    {
                        
                        props.data[props.id].abilities.map(item=>{
                            return(
                                <span className="able">{strToCamelCase(item.ability.name)},</span>
                            )
                       })
                    }
                </Col>
                <Col className='col-3'>
                    <label className="props pb-1" >Types</label>
                    <div className='text-chip' >
                        {
                            props.data[props.id].types.map(item=>{
                               return(
                                    <span style={{background:getPokemonColor(item.type.name)}}>{strToCamelCase(item.type.name)}</span>
                               );
                           })
                        }
                    </div>
                </Col>
                <Col className='col-6'>
                    <label className="props pb-1" >Weak Against</label>
                    <div className='text-chip'>
                        <span>Grass</span>
                        <span>Water</span>
                    </div>
                </Col>
            </Row>
            <Row className='stats-container'>
                <h3>Stats</h3>
                {
                    props.data[props.id].stats.map(item=>{
                        let per=item.base_stat>100?100:item.base_stat;
                        return(
                            <Col className='col-6 pb-1 pt-1'>
                                <span>{getShortName(item.stat.name)}</span>
                                <div className='range-bar col'>
                                    <div style={{width:per+"%"}}></div>
                                    78
                                </div>
                        </Col>
                        );
                   })
                }
            </Row>

          </div>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default PokemonDesc;