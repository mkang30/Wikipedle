import React  from 'react';
import ReactLoading from 'react-loading';
import StatTile from "./StatTile";
import {formatElapsedTime} from "../services/DateFormating";
export const LoadingScreen = ()=> {
    return (
        <div className='modal-wrapper' aria-label={'Loading Screen'}>
            <div className='modal-container'>
                <div className='modal-header'><h1>Please wait for the article to load</h1></div>
                <div className='modal-body' aria-label={'Loading Icon'}>
                    <ReactLoading type="cylon" color="#8095E1"
                                  height={100} width={50} />
                </div>

            </div>
        </div>)
}