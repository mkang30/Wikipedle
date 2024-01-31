import React, {ReactElement, useEffect, useState} from "react";
import StatTile from "./StatTile";
import {formatElapsedTime, isWithin24Hours} from "../services/DateFormating";
import {CookieManager} from "../services/CookieManager";

type FailureScreenProps = {
    setPage: (page: string) => void,
    title:string
}
export const FailureScreen = (props:FailureScreenProps):ReactElement => {
    const { setPage,title} = props

    return (<div className='modal-wrapper' aria-label={'wining pop up window'}>
            <div className='modal-container'>
                <div className='modal-header' aria-label={'failure screen text'}><h1>Oh no! The title was {props.title}</h1></div>
                <div className='modal-footer'>
                    <button id='try-again' onClick={() => {setPage('Home')}} aria-label={'go back to the home screen button'}>Restart Game</button>
                </div>
            </div>
        </div>)
}